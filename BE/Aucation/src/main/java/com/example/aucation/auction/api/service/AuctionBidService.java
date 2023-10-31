package com.example.aucation.auction.api.service;

import java.util.List;
import java.util.concurrent.TimeUnit;

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

@Service
@RequiredArgsConstructor
@Slf4j
public class AuctionBidService {

	private final StringRedisTemplate stringRedisTemplate;

	private final AuctionRepository auctionRepository;

	private final MemberRepository memberRepository;

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

	public void startAuction(String aucUuid) {
		log.info("*********************** startAuction START !!");

		// 경매 중인지를 파악하는 redis key 값
		String key = "auc-ing-ttl:"+aucUuid;

		stringRedisTemplate.opsForValue().set(key,"string");
		// 경매시간 30분으로 고정
		stringRedisTemplate.expire(key, 30, TimeUnit.MINUTES);
		log.info("*********************** startAuction END !!");
	}

	@SuppressWarnings("unchecked")
	public void endAuction(String aucUuid) {// 키가 삭제되었을 때 보조 인덱스에서 해당 키의 데이터를 가져옵니다.
		log.info("*********************** endAuction START !!");

		// 경매 내역을 가지는 redis key 값
		String key = "auc-ing-log:" + aucUuid;

		// 입찰 내역 List
		List<SaveAuctionBIDRedis> auctionBidList = redisTemplate.opsForList().range(key,0,-1);

		// 최고가 판별 ( 최고가 + 가장 먼저 입찰한 사용자)




		log.info("*********************** REDIS LOG DATA DELETE !!");
		redisTemplate.delete(key);
		log.info("*********************** REDIS LOG DATA DELETE DONE !!");

		log.info("*********************** endAuction START !!");
	}
}
