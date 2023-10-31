package com.example.aucation.auction.api.service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.aucation.auction.api.dto.PlaceResponse;
import com.example.aucation.auction.api.dto.RegisterRequest;
import com.example.aucation.auction.api.dto.RegisterResponse;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.auction.db.repository.AuctionRepository;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.common.redis.dto.SaveAuctionBIDRedis;
import com.example.aucation.common.util.DateFormatPattern;
import com.example.aucation.common.util.PasswordGenerator;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuctionService {

	private final StringRedisTemplate stringRedisTemplate;

	private final AuctionRepository auctionRepository;

	private final MemberRepository memberRepository;

	private final RedisTemplate<String, SaveAuctionBIDRedis> redisTemplate;


	public PlaceResponse place(Long memberPk, String auctionUUID) throws Exception {
		Auction auction = auctionRepository.findByAuctionUUID(auctionUUID).orElseThrow(()-> new Exception("auction이 없습니다"));

		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));

		return PlaceResponse.builder()
			.memberNickname(auction.getMember().getMemberNickname())
			.auctionDetail(auction.getAuctionDetail())
			.auctionTitle(auction.getAuctionTitle())
			.auctionMeetingLat(auction.getAuctioMeetingLat())
			.auctionMeetingLng(auction.getAuctionMeetingLng())
			.auctionEndPrice(auction.getAuctionEndPrice())
			.auctionObjectName(auction.getAuctionObjectName())
			.memberPoint(member.getMemberPoint())
			.build();
	}

	public void saveBIDRedis(String auctionUUID, List<SaveAuctionBIDRedis> content){
		content.forEach(bid -> redisTemplate.opsForZSet().add(auctionUUID, bid, bid.getLowPrice()));
	}

	@Transactional
	public void register(Long memberPk, RegisterRequest registerRequest) {
		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		String auctionUUID = PasswordGenerator.generate();
		Auction auction = Auction.builder()
			.auctionDetail(registerRequest.getAuctionDetail())
			.auctionCumtomerPk(registerRequest.getAuctionCumtomerPk())
			.auctionStatus(AuctionStatus.BID)
			.auctionType(registerRequest.getAuctionType())
			.auctionTitle(registerRequest.getAuctionTitle())
			.auctioMeetingLat(registerRequest.getAuctioMeetingLat())
			.auctionEndPrice(registerRequest.getAuctionEndPrice())
			.auctionMeetingLng(registerRequest.getAuctionMeetingLng())
			.auctionObjectName(registerRequest.getAuctionObjectName())
			.auctionStartDate(registerRequest.getAuctionStartDate())
			.auctionStartPrice(registerRequest.getAuctionStartPrice())
			.auctionUUID(auctionUUID)
			.member(member)
			.build();

		auctionRepository.save(auction);
		// SaveAuctionBIDRedis saveAuctionBIDRedis = SaveAuctionBIDRedis.builder()
		// 	.purchaseId("null")
		// 	.lowPrice(0)
		// 	.build();
		// List<SaveAuctionBIDRedis> saveAuctionBIDRedisList = new ArrayList<>();
		// saveAuctionBIDRedisList.add(saveAuctionBIDRedis);
		// saveBIDRedis(auctionUUID,saveAuctionBIDRedisList);
		String key = "auc-pre:"+auctionUUID;
		stringRedisTemplate.opsForValue().set(key,"string");
		stringRedisTemplate.expire(key, 30, TimeUnit.SECONDS);
	}
}
