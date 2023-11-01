package com.example.aucation.auction.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.example.aucation.auction.api.dto.BidResponse;
import com.example.aucation.auction.db.entity.AuctionHistory;
import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.auction.db.entity.BIDStatus;
import com.example.aucation.auction.db.repository.AuctionBidRepository;
import com.example.aucation.auction.db.repository.AuctionHistoryRepository;
import com.example.aucation.common.util.DateFormatPattern;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.example.aucation.auction.api.dto.BIDRequest;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.repository.AuctionRepository;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.BadRequestException;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.common.redis.dto.SaveAuctionBIDRedis;
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




	public int findhighPrice(String auctionPK) {
		return 1;
	}

	public void isCharge(long memberPk, BIDRequest bidRequest, String auctionUUID) {
		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		Auction auction = auctionRepository.findByAuctionUUID(auctionUUID).orElseThrow(()-> new NotFoundException(ApplicationError.INTERNAL_SERVER_ERROR));
		if(member.getMemberPoint()<=auction.getAuctionEndPrice()+bidRequest.getBidPoint()){
			throw new BadRequestException(ApplicationError.INTERNAL_SERVER_ERROR);
		}

	}

	@Transactional
	public BidResponse isService(long memberPk, String auctionUUID) throws Exception {
		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		Auction auction = auctionRepository.findByAuctionUUID(auctionUUID).orElseThrow(()-> new Exception("히히하하"));

		int firstPoint = member.getMemberPoint();
		List<SaveAuctionBIDRedis> bids = redisTemplate.opsForList().range("auc-ing-ttl:"+auctionUUID, 0, -1);
		int bid = calculateValue(auction.getAuctionStartPrice());

		// Redis에 아무도 존재하지않다면 DB에서 일단 돈을 뺌 - Redis에 입찰목록에 넣어놓음
		if(bids.isEmpty()){
			return processFirstBid(member, firstPoint, bid, auction);
		}
		// Redis에서 확인
		else{
			return processNotFirstBid(member, bids, firstPoint, bid, auction);
		}
	}

	public void saveBIDRedis(String auctionUUID, SaveAuctionBIDRedis content){
		redisTemplate.opsForList().rightPush(auctionUUID, content);
	}

	private BidResponse processFirstBid(Member member, int firstPoint, int bid, Auction auction) {
		firstPoint -= bid;
		if(firstPoint <=0){
			throw new NotFoundException(ApplicationError.MEMBER_NOT_FOUND);
		}
		member.updatePoint(firstPoint);
		SaveAuctionBIDRedis saveAuctionBIDRedis = SaveAuctionBIDRedis.builder()
				.bidTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern(DateFormatPattern.get())))
				.lowPrice(bid)
				.purchasePk(member.getId())
				.build();
		saveBIDRedis(auction.getAuctionUUID(),saveAuctionBIDRedis);

		return BidResponse.builder()
				.firstUserPoint(firstPoint)
				.firstBid(auction.getAuctionStartPrice())
				.bidStatus(BIDStatus.FIRST_BID)
				.firstUser(member.getMemberId())
				.build();
	}

	private BidResponse processNotFirstBid(Member member, List<SaveAuctionBIDRedis> bids, int firstPoint, int bid,
										   Auction auction) {
		int count = 0;
		Long memberPk = 0L;

		for (SaveAuctionBIDRedis redisBids : bids) {
			if (redisBids.getLowPrice() >= count) {
				count = redisBids.getLowPrice();
				memberPk = redisBids.getPurchasePk();
			}
		}

		firstPoint -= (count + bid);
		member.updatePoint(firstPoint);

		Member secondUser = memberRepository.findById(memberPk).orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		int secondUserPoint = secondUser.updatePlusPoint(count);

		SaveAuctionBIDRedis saveAuctionBIDRedis = SaveAuctionBIDRedis.builder()
				.bidTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern(DateFormatPattern.get())))
				.lowPrice(count + bid)
				.purchasePk(member.getId())
				.build();
		saveBIDRedis(auction.getAuctionUUID(), saveAuctionBIDRedis);

		return BidResponse.builder()
				.firstUserPoint(firstPoint)
				.firstBid(count + bid)
				.firstUser(member.getMemberId())
				.secondUser(secondUser.getMemberId())
				.secondUserPoint(secondUserPoint)
				.bidStatus(BIDStatus.NOT_FIRST_BID)
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
		auction.updateAuctionToEnd(auctionBidList.get(0).getLowPrice(),customer);
		log.info("*********************** 경매 정보 저장 성공 !!");

		log.info("*********************** REDIS LOG DATA DELETE !!");
		redisTemplate.delete(key);
		log.info("*********************** REDIS LOG DATA DELETE DONE !!");

		log.info("*********************** endAuction START !!");
	}
}
