package com.example.aucation.auction.api.controller;

import com.example.aucation.auction.api.dto.BidResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.aucation.auction.api.dto.BIDRequest;
import com.example.aucation.auction.api.service.AuctionBidService;
import com.example.aucation.common.redis.dto.SaveAuctionBIDRedis;
import com.example.aucation.common.support.AuthorizedVariable;
import com.example.aucation.member.db.entity.Member;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class WebsocketChatController {

	private final AuctionBidService auctionBidService;

	@Autowired
	private SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

	// 클라이언트가 send 하는 경로
	//stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
	// /app/send/{crId}
	//옥션 페이지에 들어간다면

	//일단 입찰 버튼을 누름
	@MessageMapping("/send/register/{auctionUUID}")
	public void streamText(@AuthorizedVariable long memberPk, @DestinationVariable("auctionUUID") String auctionUUID) throws
			Exception {
		BidResponse bidResponse = auctionBidService.isService(memberPk,auctionUUID);
		template.convertAndSend("/topic/sub/" + auctionUUID, bidResponse);
	}
}
