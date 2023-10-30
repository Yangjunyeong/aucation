package com.example.aucation.auction.api.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.aucation.auction.api.service.AuctionBidService;
import com.example.aucation.common.redis.dto.SaveAuctionBIDRedis;
import com.example.aucation.common.redis.dto.SaveAuctionRedis;
import com.example.aucation.common.support.AuthorizedVariable;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class WebsocketChatController {
	// private final ChatService chatService;
	private final AuctionBidService auctionBidService;

	@Autowired
	private SimpMessagingTemplate template; //특정 Broker로 메세지를 전달

	// 클라이언트가 send 하는 경로
	//stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
	// /app/send/{crId}
	//옥션 페이지에 들어간다면
	@MessageMapping("/send/{auctionPK}")
	public void streamText(@AuthorizedVariable Long memberPk, @DestinationVariable("auctionPK") String auctionPK) {

		// 채팅 내용 Redis에 저장
		// System.out.println("sendtime: "+content.getScrcSendTime());
		int highPrice = auctionBidService.findhighPrice(auctionPK);

		// System.out.println("subscribe 주소: /topic/sub/"+sessionId);
		// 특정 sessionId를 가지는 채팅방에 broad casting
		template.convertAndSend("/topic/sub/" + auctionPK);
	}
}


// 경매장이 등록된다
// 경매장이
