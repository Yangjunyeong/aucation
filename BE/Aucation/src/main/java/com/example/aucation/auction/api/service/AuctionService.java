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
import com.example.aucation.like.db.entity.LikeAuction;
import com.example.aucation.like.db.repository.LikeAuctionRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.relational.core.sql.Like;
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

	private final LikeAuctionRepository likeAuctionRepository;

	private final RedisTemplate<String, SaveAuctionBIDRedis> redisTemplate;

	private final PhotoService photoService;
	private final int COUNT_IN_PAGE = 15;


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
			 askPrice = nowPrice;
		}else{
			Collections.sort(bids);
		 	nowPrice = bids.get(0).getBidPrice();
		 	askPrice = nowPrice + bids.get(0).getAskPrice();
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

		//경매라면
		if(registerRequest.getAuctionStatus().equals(AuctionStatus.BID)){
			Auction auction = Auction.builder()
				.auctionDetail(registerRequest.getAuctionDetail())
				.auctionStatus(AuctionStatus.BID)
				.auctionType(registerRequest.getAuctionType())
				.auctionTitle(registerRequest.getAuctionTitle())
				.auctioMeetingLat(registerRequest.getAuctionMeetingLat())
				.auctionMeetingLng(registerRequest.getAuctionMeetingLng())
				.auctionEndPrice(0)
				.auctionStartDate(LocalDateTime.now().plusMinutes(registerRequest.getAuctionStartAfterTime()))
				.auctionEndDate(LocalDateTime.now().plusMinutes(registerRequest.getAuctionStartAfterTime()).plusMinutes(30))
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
		//역 경매라면
		else if(registerRequest.getAuctionStatus().equals(AuctionStatus.REVERSE_BID)) {
			Auction auction = Auction.builder()
				.auctionDetail(registerRequest.getAuctionDetail())
				.auctionStatus(AuctionStatus.REVERSE_BID)
				.auctionType(registerRequest.getAuctionType())
				.auctionTitle(registerRequest.getAuctionTitle())
				.auctioMeetingLat(registerRequest.getAuctionMeetingLat())
				.auctionMeetingLng(registerRequest.getAuctionMeetingLng())
				.auctionEndPrice(0)
				.auctionStartDate(LocalDateTime.now())
				.auctionEndDate(LocalDateTime.now().plusMinutes(registerRequest.getAuctionStartAfterTime()))
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

	}

	public AuctionListResponse getAuctionPreList(Long memberPk,int pageNum, AuctionSortRequest sortRequest) {
		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		if (pageNum<1){
			pageNum =1;
		}
		Pageable pageable = PageRequest.of(pageNum - 1, COUNT_IN_PAGE);
		AuctionListResponse auctions = auctionRepository.searchPreAucToCondition(member,pageNum,sortRequest,pageable);
		return auctions;
	}

	public AuctionListResponse getAuctionIngList(Long memberPk,int pageNum, AuctionSortRequest sortRequest) {
		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		Pageable pageable = PageRequest.of(pageNum - 1, COUNT_IN_PAGE);
		AuctionListResponse auctions = auctionRepository.searchIngAucByCondition(member,pageNum,sortRequest, pageable);

		return auctions;
	}

	public AuctionDetailResponse getDetailInfoByAuctionPk(Long memberPk, Long auctionPk) throws Exception {
		log.info("********************** getDetailInfoByAuctionPk start");
		LocalDateTime nowTime =LocalDateTime.now();
		AuctionDetailResponse auctionDetailResponse = auctionRepository.searchDetailAucToPk(auctionPk, memberPk);
		if(auctionDetailResponse == null){
			log.error("********************** AUCTION NO EXIST");
			throw new Exception("Auction no exist");
		}

		auctionDetailResponse.setNowTime(nowTime);

		log.info("********************** 경매 사진 가져오기 시도");
		List<String> auctionPhotoUrl = new ArrayList<>();
		List<Photo> auctionPhotos = photoService.getPhoto(auctionPk);
		for(Photo p : auctionPhotos){
			auctionPhotoUrl.add(p.getImgUrl());
		}
		auctionDetailResponse.setAuctionPhoto(auctionPhotoUrl);
		log.info("********************** 경매 사진 가져오기 및 설정 성공, 사진 수 ={}", auctionPhotoUrl.size());

		if(auctionDetailResponse.getAuctionStatus().equals(AuctionStatus.REVERSE_BID)){
			log.info("********************** 역경매 정보 설정 시도");
			
			// 추후 개발예정

			log.info("********************** 역경매 정보 설정 완료");
			return auctionDetailResponse;
		}
		log.info("********************** 경매 상태 지정");
		if(nowTime.isBefore(auctionDetailResponse.getAuctionStartTime())){
			log.info("********************** 경매 상태 = {}","경매 전");
			auctionDetailResponse.setIsAction(0);

			log.info("********************** 경매 예상 호가 설정 시도");
			auctionDetailResponse.setAuctionAskPrice(
					calculateValue(auctionDetailResponse.getAuctionStartPrice()));
			log.info("********************** 경매 예상 호가 설정 성공, 호가 = {}",
					auctionDetailResponse.getAuctionAskPrice());
		}else if(nowTime.isAfter(auctionDetailResponse.getAuctionStartTime())
				&& nowTime.isBefore(auctionDetailResponse.getAuctionEndTime())){
			log.info("********************** 경매 상태 = {}","경매 중");
			auctionDetailResponse.setIsAction(1);

			log.info("********************** 경매 입찰 내역 가져오기 시도");
			List<SaveAuctionBIDRedis> bids = redisTemplate.opsForList().range(
					"auc-ing-log:"+auctionDetailResponse.getAuctionUUID(),0,-1);
			log.info("********************** 경매 입찰 내역 가져오기 성공");
			if(bids == null || bids.isEmpty()){
				log.info("********************** 경매 입찰 존재하지 않음");
				auctionDetailResponse.setAuctionTopPrice(auctionDetailResponse.getAuctionStartPrice());
				auctionDetailResponse.setAuctionAskPrice(
						calculateValue(auctionDetailResponse.getAuctionTopPrice()));
				log.info("********************** 경매 초기값 설정 완료. 현재가 = {}, 호가 ={}",
						auctionDetailResponse.getAuctionTopPrice(), auctionDetailResponse.getAuctionAskPrice());
			}else{
				log.info("********************** 경매 입찰 존재");

				log.info("********************** 경매 현재값 설정 시도");
				Collections.sort(bids);
				auctionDetailResponse.setAuctionTopPrice(bids.get(0).getBidPrice());
				auctionDetailResponse.setAuctionAskPrice(bids.get(0).getAskPrice());
				auctionDetailResponse.setAuctionCurCnt(bids.get(0).getHeadCnt());
				log.info("********************** 경매 현재값 설정 완료. 현재 최고가 = {}, 호가 ={}, 참여자 ={}",
						auctionDetailResponse.getAuctionTopPrice(),
						auctionDetailResponse.getAuctionAskPrice(),
						auctionDetailResponse.getAuctionCurCnt());
			}
		}else{
			auctionDetailResponse.setIsAction(-1);
			log.info("********************** 경매 상태 = {}","경매 완료");
		}
		log.info("********************** 경매 상태 지정 완료");
		log.info("********************** getDetailInfoByAuctionPk end");
		return auctionDetailResponse;
	}

	@Transactional
	public void setLikeAuction(Long memberPk, Long auctionPk) throws Exception {
		log.info("********************** setLikeAuction() 시작");
		Member member = memberRepository.findById(memberPk)
				.orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		Auction auction = auctionRepository.findById(auctionPk)
				.orElseThrow(()-> new Exception("AUCTION NO EXIST"));

		likeAuctionRepository.findByAuctionAndMember(auction,member)
						.ifPresentOrElse(
								likeAuction->{
									log.info("********************** 좋아요 존재 O");
									likeAuctionRepository.delete(likeAuction);
									log.info("********************** memberPk : {} -> auctionPk : {} 좋아요 설정 취소"
											,memberPk,auctionPk);
								},
								()->{
									log.info("********************** 좋아요 존재 X");
									likeAuctionRepository.save(LikeAuction
													.builder()
													.member(member)
													.auction(auction)
													.build());
									log.info("********************** memberPk : {} -> auctionPk : {} 좋아요 설정"
											,memberPk,auctionPk);
								}
						);
		log.info("********************** setLikeAuction() 완료");
	}


//
//	public List<ReAuctionResponse> getReAuctionList(Long memberPk,int pageNum, AuctionSortRequest sortRequest) {
//		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
//		List<Auction> auctions = auctionRepository.searchReAucByCondition(member,pageNum,sortRequest);
//		return null;
//	}
}
