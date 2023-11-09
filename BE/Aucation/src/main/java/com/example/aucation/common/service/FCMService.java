package com.example.aucation.common.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.auction.db.repository.AuctionRepository;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.like.db.entity.LikeAuction;
import com.example.aucation.like.db.repository.LikeAuctionRepository;
import com.example.aucation.member.api.dto.FCMTokenReq;
import com.example.aucation.member.api.dto.FCMTokenRes;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.repository.MemberRepository;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Notification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class FCMService {

	private final MemberRepository memberRepository;

	private final AuctionRepository auctionRepository;

	private final LikeAuctionRepository likeAuctionRepository;

	private final FirebaseMessaging firebaseMessaging;

	private static final String ALRAM_TITLE = "경매 시작 알림이 도착했습니다";

	private static final String ALRAM_BODY = "라는 경매가 지금 시작되었습니다!";

	private static final String SUCCESS_TOKEN_SAVE = "성공적으로 토큰이 저장되었습니다";

	private static final String HIGH_ALRAM_TITLE = " 의 최고 경매자 바뀜";

	private static final String HIGH_ALRAM_BODY = "최고 경매자가 나타났습니다 경매를 다시하여 상품을 가지세요";
	@Transactional
	public FCMTokenRes saveToken(long memberPk, FCMTokenReq fcmTokenReq) {

		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));

		member.updateFCMToken(fcmTokenReq.getToken());

		return FCMTokenRes.builder().message(SUCCESS_TOKEN_SAVE).build();

	}

	@Transactional
	public void setAucAlram(String auctionUUID) throws FirebaseMessagingException {
		//UUID로 auction 검색
		Auction auction = auctionRepository.findByAuctionUUID(auctionUUID).orElseThrow(()-> new NotFoundException(ApplicationError.NOT_EXIST_AUCTION));
		//auctionPK로 좋아요 테이블 검색
		List<LikeAuction> likeAuctions = likeAuctionRepository.findByAuctionId(auction.getId());

		if(likeAuctions==null){
			return;
		}
		//각 해당하는 사람들한테 메세지 전송
		for (LikeAuction likeAlram: likeAuctions) {
			Map<String, String> data = new HashMap<>();
			data.put("auctionUUID", auction.getAuctionUUID());
			Notification notification = Notification.builder()
				.setTitle(ALRAM_TITLE)
				.setBody(auction.getAuctionTitle()+ ALRAM_BODY)
				.build();

			com.google.firebase.messaging.Message message = com.google.firebase.messaging.Message.builder()
				.setToken(likeAlram.getMember().getMemberFCMToken())
				.setNotification(notification)
				.putAllData(data)
				.build();

			firebaseMessaging.send(message);
		}



	}

	@Transactional
	public void setAucHighAlram(Member secondUser, String auctionUUID) throws FirebaseMessagingException {

		Auction auction = auctionRepository.findByAuctionUUID(auctionUUID).orElseThrow(()-> new NotFoundException(ApplicationError.NOT_EXIST_AUCTION));

		Map<String, String> data = new HashMap<>();
		data.put("auctionUUID", auctionUUID);
		Notification notification = Notification.builder()
			.setTitle(auction.getAuctionTitle()+ALRAM_TITLE)
			.setBody(auction.getAuctionTitle() + ALRAM_BODY)
			.build();

		com.google.firebase.messaging.Message message = com.google.firebase.messaging.Message.builder()
			.setToken(secondUser.getMemberFCMToken())
			.setNotification(notification)
			.putAllData(data)
			.build();

		firebaseMessaging.send(message);

	}
}
