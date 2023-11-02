package com.example.aucation.auction.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import com.example.aucation.auction.api.dto.BidResponse;
import com.example.aucation.auction.db.entity.AuctionHistory;
import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.auction.db.entity.BIDStatus;
import com.example.aucation.auction.db.repository.AuctionBidRepository;
import com.example.aucation.auction.db.repository.AuctionHistoryRepository;
import com.example.aucation.common.error.DuplicateException;
import com.example.aucation.common.util.DateFormatPattern;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.simp.user.SimpSubscription;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Service;

import com.example.aucation.auction.api.dto.BIDRequest;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.repository.AuctionRepository;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.BadRequestException;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.common.redis.dto.SaveAuctionBIDRedis;
import com.example.aucation.common.util.RangeValueCalculator;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;

import static com.example.aucation.common.util.RangeValueCalculator.calculateValue;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuctionBidService {

	private final StringRedisTemplate stringRedisTemplate;

	private final AuctionRepository auctionRepository;

	private final MemberRepository memberRepository;

	private final AuctionHistoryRepository auctionHistoryRepository;

	private final AuctionBidRepository auctionBidRepository;

	private final RedisTemplate<String, SaveAuctionBIDRedis> redisTemplate;

	private final SimpUserRegistry simpUserRegistry;

	@Transactional
	public BidResponse isService(long highPurchasePk, String auctionUUID) throws Exception {
		Member member = memberRepository.findById(highPurchasePk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		Auction auction = auctionRepository.findByAuctionUUID(auctionUUID).orElseThrow(()-> new Exception("히히하하"));

		//Owner가 member인지 판단하기
		isOwnerBid(highPurchasePk,auction.getOwner().getId());

		// 지금 입찰하기위해서 돈이 충분한지 확인하기
		int firstPoint = member.getMemberPoint();

		//지금 현재 입찰중인 상황이 있는지 확인하기
		List<SaveAuctionBIDRedis> bids = redisTemplate.opsForList().range("auc-ing-log:"+auctionUUID, 0, -1);

		//지금 호가 알아보기
		// int bid = calculateValue(auction.getAuctionStartPrice());
		int peopleCount = getNumberOfSubscribersInChannel(auctionUUID);

		//입찰자가 아무도 없다
		if(bids.isEmpty()){
			return processFirstBid(member, firstPoint, calculateValue(auction.getAuctionStartPrice()) ,auction,peopleCount);
		}
		// 입찰자가 한명이라도 존재한다.
		else{
			return processNotFirstBid(member, bids, firstPoint, auction,peopleCount);
		}
	}

	private BidResponse processFirstBid(Member member, int firstPoint, int bid, Auction auction,int peopleCount) {
		//처음 입찰이니까 현재있는돈에서 입찰가를 뺀다 (금액을 지불한다)
		firstPoint -= bid;
		//애초에 0이면 돈없으니까 빠꾸
		if(firstPoint <0){
			throw new BadRequestException(ApplicationError.MEMBER_NOT_HAVE_MONEY);
		}
		//돈있으면 0원 저장하기.
		member.updatePoint(firstPoint);
		int curBid = calculateValue(auction.getAuctionStartPrice()+bid);
		//Redis는
		//1. 언제 입찰했는지
		//2. 지금 최고가가 얼마인지
		//3. 호가가 얼마인지
		//4. 구매자가누구인지
		//5. 현재 인원수가 몇명있는지
		SaveAuctionBIDRedis saveAuctionBIDRedis = SaveAuctionBIDRedis.builder()
				.bidTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern(DateFormatPattern.get())))
				.bidPrice(auction.getAuctionStartPrice()+bid)
				.askPrice(curBid)
				.purchasePk(member.getId())
				.peopleCount(peopleCount)
				.build();
		saveBIDRedis("auc-ing-log:"+auction.getAuctionUUID(),saveAuctionBIDRedis);

		//무엇을 봐야하는가?
		//1.firstPoint 	(현재 내 포인트 - 나)
		//2.firstBid 	(현재 최고 입찰가 - 나)
		//3.firstUser	(현재 최고 입찰자 - 나)
		//4.ask		(현재 최고 입찰가 - 나)
		return BidResponse.builder()
				.firstUserPoint(firstPoint)
				.firstBid(auction.getAuctionStartPrice()+bid)
				.firstUser(member.getId())
				.secondUserPoint(0)
				.secondUser(0)
				.peopleCount(peopleCount)
				.askPrice(curBid)
				.build();
	}

	private BidResponse processNotFirstBid(Member member, List<SaveAuctionBIDRedis> bids, int firstPoint,Auction auction,int peopleCount) {

		// 최고 입찰가와 최고 입찰자 현재 입찰가를 확인해야함
		int highBidPrice = 0;
		Long highPurchasePk = 0L;

		for (SaveAuctionBIDRedis redisBids : bids) {
			if (redisBids.getBidPrice() > highBidPrice) {
				highBidPrice = redisBids.getBidPrice();
				highPurchasePk = redisBids.getPurchasePk();
			}
		}
		//내가 최고 입찰자면 입찰 못합니다.
		isHighBidOwner(member.getId(),highPurchasePk);

		//입찰하기전에 원래가격의 호가를 알아본다.
		int preBid = calculateValue(highBidPrice);
		
		//하지만 원래가격의호가+원래가격 => 다음 입찰을한다는 가정하의 호가가격임
		int curBid = calculateValue ((preBid+highBidPrice));
		//입찰가+호가 보다 커야 입찰가능
		firstPoint -= (highBidPrice + curBid);

		//입찰하지못하면 나가야함.
		if(firstPoint <0){
			throw new BadRequestException(ApplicationError.MEMBER_NOT_HAVE_MONEY);
		}
		
		//입찰할수있으니 저장함.
		member.updatePoint(firstPoint);

		//입찰할수있다는건 현재 제일 높은 입찰가의 돈을 돌려줘야함.
		Member secondUser = memberRepository.findById(highPurchasePk).orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));

		//돈을 돌려주기로 선택.
		int secondUserPoint = secondUser.updatePlusPoint(highBidPrice);

		//Redis 에서 서장
		//1. 입찰시간이 언제인지
		//2. 지금 호가가 얼마인지
		//3. 지금 최고 입찰가가 얼마인지
		//4. 구매자가 누구인지
		//5. 인원수가 몇명인지
		SaveAuctionBIDRedis saveAuctionBIDRedis = SaveAuctionBIDRedis.builder()
				.bidTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern(DateFormatPattern.get())))
				.askPrice(curBid)
				.bidPrice(curBid+highBidPrice)
				.purchasePk(member.getId())
				.peopleCount(peopleCount)
				.build();
		saveBIDRedis("auc-ing-log:"+auction.getAuctionUUID(), saveAuctionBIDRedis);

		//무엇을 봐야하는가?
		//1.firstPoint 	(현재 내 포인트 - 나)
		//2.firstBid 	(현재 최고 입찰가 - 나)
		//3.firstUser	(현재 최고 입찰자 - 나)
		//4.secondUser (최고였던 입찰자 - 어떤누군가
		//5.secondUserPoint (최고였던 입찰자의 모든 돈 - 어떤 누군가)
		//6.ask		(현재 호가 - 나)
		return BidResponse.builder()
				.firstUserPoint(firstPoint)
				.firstBid(highBidPrice + curBid)
				.firstUser(member.getId())
				.secondUser(secondUser.getId())
				.secondUserPoint(secondUserPoint)
				.peopleCount(peopleCount)
				.askPrice(curBid)
				.build();
	}

	public void startAuction(String aucUuid) {
		log.info("*********************** startAuction START !!");

		// 경매 중인지를 파악하는 redis key 값
		String key = "auc-ing-ttl:"+aucUuid;

		stringRedisTemplate.opsForValue().set(key,"This key is prepared Key");
		// 경매시간 30분으로 고정
		stringRedisTemplate.expire(key, 30, TimeUnit.MINUTES);
		log.info("*********************** startAuction END !!");
	}

	@Transactional
	@SuppressWarnings("unchecked")
	public void endAuction(String aucUuid)  throws Exception {// 키가 삭제되었을 때 보조 인덱스에서 해당 키의 데이터를 가져옵니다.
		log.info("*********************** endAuction START !!");

		Auction auction = auctionRepository.findByAuctionUUID(aucUuid)
				.orElseThrow(()-> new Exception("Auction이 없습니다"));
		// 경매 내역을 가지는 redis key 값
		String key = "auc-ing-log:" + aucUuid;

		// 입찰 내역 List
		List<SaveAuctionBIDRedis> auctionBidList = redisTemplate.opsForList().range(key,0,-1);

		// 최고가 판별 ( 최고가 + 가장 먼저 입찰한 사용자)
		if(auctionBidList == null){
			log.info("*********************** NULL !!");
		}
		
		if(auctionBidList.size()<1){
			log.info("*********************** 경매 낙찰자 없음 !!");
			auction.updateAuctionToEndCustomerIsNone(-1);
			return;
		}else if(auctionBidList.size()>1){
			log.info("*********************** List 정렬 !!");
			Collections.sort(auctionBidList);
		}
		log.info("*********************** 경매 낙찰자 있음 !!");
		Member customer = memberRepository.findById(auctionBidList.get(0).getPurchasePk())
				.orElseThrow(()->new Exception("member 없음"));
		log.info("*********************** 입찰 거래 내역 저장 시도 !!");
		AuctionHistory auctionHistory = AuctionHistory.builder()
				.historyDateTime(LocalDateTime.parse(auctionBidList.get(0).getBidTime(), DateTimeFormatter.ofPattern(DateFormatPattern.get())))
				.owner(auction.getOwner())
				.customer(customer)
				.auction(auction)
				.build();
		auctionHistoryRepository.save(auctionHistory);
		log.info("*********************** 입찰 거래 내역 저장 성공 !!");

		log.info("*********************** 입찰 내역 저장 시도 !!");
		auctionBidRepository.saveAll(auctionBidList,auction.getId());
		log.info("*********************** 입찰 내역 저장 성공 !!");

		log.info("*********************** 경매 정보 저장 시도 !!");
		auction.updateAuctionToEnd(auctionBidList.get(0).getBidPrice(),customer);
		log.info("*********************** 경매 정보 저장 성공 !!");

		log.info("*********************** REDIS LOG DATA DELETE !!");
		redisTemplate.delete(key);
		log.info("*********************** REDIS LOG DATA DELETE DONE !!");

		log.info("*********************** endAuction START !!");
	}


	public int getNumberOfSubscribersInChannel(String channelName) {
		// 특정 채널에 대한 구독자 수를 세기 위해 "/topic/sub/" + auctionUUID와 같은 채널 이름을 지정
		String channel = "/topic/sub/" + channelName;

		// simpUserRegistry를 사용하여 해당 채널의 구독자 수를 가져옴
		Set<SimpSubscription> sessionIds = simpUserRegistry.findSubscriptions(
			subscription -> subscription.getDestination().equals(channel)
		);
		log.info(channelName);
		return sessionIds.size();
	}

	public void saveBIDRedis(String auctionUUID, SaveAuctionBIDRedis content){
		redisTemplate.opsForList().rightPush(auctionUUID, content);
	}

	private void isOwnerBid(Long highPurchasePk, Long ownerPk) {
		if(Objects.equals(highPurchasePk, ownerPk)){
			throw new BadRequestException(ApplicationError.OWNER_NOT_BID);
		}
	}

	private void isHighBidOwner(Long highPurchasePk, Long ownerPk) {
		if(Objects.equals(highPurchasePk, ownerPk)){
			throw new DuplicateException(ApplicationError.DUPLICATE_NOT_BID);
		}
	}
}
