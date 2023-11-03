package com.example.aucation.auction.api.service;

import static com.example.aucation.common.util.RangeValueCalculator.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

import com.example.aucation.auction.api.dto.*;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.aucation.auction.api.dto.PlaceResponse;
import com.example.aucation.auction.api.dto.RegisterRequest;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.auction.db.repository.AuctionRepository;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.common.redis.dto.SaveAuctionBIDRedis;
import com.example.aucation.common.util.PasswordGenerator;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.repository.MemberRepository;
import com.example.aucation.photo.api.service.PhotoService;
import com.example.aucation.photo.db.Photo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuctionService {

	private final StringRedisTemplate stringRedisTemplate;

	private final AuctionRepository	 auctionRepository;

	private final MemberRepository memberRepository;

	private final RedisTemplate<String, SaveAuctionBIDRedis> redisTemplate;

	private final PhotoService photoService;

	@Transactional
	public PlaceResponse place(Long memberPk, String auctionUUID) throws Exception {
		Auction auction = auctionRepository.findByAuctionUUID(auctionUUID)
			.orElseThrow(() -> new Exception("auction이 없습니다"));

		Member member = memberRepository.findById(memberPk)
			.orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));

		List<SaveAuctionBIDRedis> bids = redisTemplate.opsForList().range("auc-ing-log:"+auctionUUID, 0, -1);

		List<Photo> photoList = photoService.getPhoto(auction.getId());

		List<String> UUIDImage = new ArrayList<>();

		for(Photo photo: photoList){
			UUIDImage.add(photo.getImgUrl());
		}

		int nowPrice=0;
		int askPrice=0;
		int headCnt=0;
		boolean isBid=false;

		if(bids.isEmpty()){
			 nowPrice = auction.getAuctionStartPrice();
			 askPrice = calculateValue(nowPrice);
		}else{
			Collections.sort(bids);
		 	nowPrice = bids.get(0).getBidPrice();
		 	askPrice = bids.get(0).getAskPrice();
			headCnt = bids.get(0).getHeadCnt();
			if(Objects.equals(bids.get(0).getPurchasePk(), memberPk)){
				isBid=true;
			}
		}

		log.info(auction.getOwner().getMemberId());

		return PlaceResponse.builder()
			.memberPoint(member.getMemberPoint())
			.memberPk(memberPk)
			.myNickname(member.getMemberNickname())
			.title(auction.getAuctionTitle())
			.detail(auction.getAuctionDetail())
			.ownerNickname(auction.getOwner().getMemberNickname())
			.ownerPk(auction.getOwner().getId())
			.ownerType(auction.getOwner().getMemberRole())
			.enterTime(auction.getAuctionStartDate())
			.endTime(auction.getAuctionStartDate().plusMinutes(30))
			.ownerPicture(auction.getOwner().getImageURL())
			.picture(UUIDImage)
			.highBid(isBid)
			.headCnt(headCnt)
			.nowPrice(nowPrice)
			.askPrice(askPrice)
			.build();
	}

	@Transactional
	public void register(Long memberPk, RegisterRequest registerRequest, List<MultipartFile> multipartFiles) throws IOException {
		Member member = memberRepository.findById(memberPk)
			.orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		String auctionUUID = PasswordGenerator.generate();

		Auction auction = Auction.builder()
			.auctionDetail(registerRequest.getAuctionDetail())
			.auctionStatus(AuctionStatus.BID)
			.auctionType(registerRequest.getAuctionType())
			.auctionTitle(registerRequest.getAuctionTitle())
			.auctioMeetingLat(registerRequest.getAuctionMeetingLat())
			.auctionMeetingLng(registerRequest.getAuctionMeetingLng())
			.auctionEndPrice(0)
			.auctionStartDate(LocalDateTime.now().plusMinutes(registerRequest.getAuctionStartAfterTime()))
			.auctionStartPrice(registerRequest.getAuctionStartPrice())
			.auctionUUID(auctionUUID)
			.owner(member)
			.build();

		auctionRepository.save(auction);

		photoService.upload(multipartFiles, auctionUUID);
		String key = "auc-pre:" + auctionUUID;
		stringRedisTemplate.opsForValue().set(key, "This is a token for Prepared_Auction");
		stringRedisTemplate.expire(key, registerRequest.getAuctionStartAfterTime(), TimeUnit.MINUTES);
	}

	public AuctionListResponse getAuctionPreList(Long memberPk,int pageNum, AuctionSortRequest sortRequest) {
		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		if (pageNum<1){
			pageNum =1;
		}
		AuctionListResponse auctions = auctionRepository.searchPreAucToCondition(member,pageNum,sortRequest);
		auctions.setNowTime(LocalDateTime.now());

		for (AuctionPreResponseItem item : auctions.getPreItems()) {
			List<Photo> photoList = photoService.getPhoto(item.getAuctionPk());
			if(!photoList.isEmpty()){
				item.setAuctionImg(photoList.get(0).getImgUrl());
			}
		}
		return auctions;
	}

	public AuctionListResponse getAuctionIngList(Long memberPk,int pageNum, AuctionSortRequest sortRequest) {
		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		AuctionListResponse auctions = auctionRepository.searchIngAucByCondition(member,pageNum,sortRequest);
		for (AuctionIngResponseItem item : auctions.getIngItems()) {
			List<Photo> photoList = photoService.getPhoto(item.getAuctionPk());
			if(!photoList.isEmpty()){
				item.setAuctionImg(photoList.get(0).getImgUrl());
			}
			List<SaveAuctionBIDRedis> bidList = redisTemplate.opsForList().range(item.getAuctionUUID()
					,0,-1);
			if(bidList ==null || bidList.isEmpty()){
				item.setAuctionTopBidPrice(item.getAuctionStartPrice());
				item.setAuctionCurCnt(0);
				continue;
			}
			Collections.sort(bidList);
			item.setAuctionTopBidPrice(bidList.get(0).getBidPrice());
			item.setAuctionCurCnt(bidList.get(0).getHeadCnt());
		}
		return auctions;
	}
//
//	public List<ReAuctionResponse> getReAuctionList(Long memberPk,int pageNum, AuctionSortRequest sortRequest) {
//		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
//		List<Auction> auctions = auctionRepository.searchReAucByCondition(member,pageNum,sortRequest);
//		return null;
//	}
}
