package com.example.aucation.auction.api.controller;

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
	public void streamText(@AuthorizedVariable long memberPk, @Payload BIDRequest bidRequest,@DestinationVariable("auctionUUID") String auctionUUID) {
		//레디스에서 관리하는것을 생각하자.

		//1. 입찰할 돈이 충분한가


		//2. 입찰할 돈이 충분하지않다면?
		//돈이없다고 메세지를 띄운다.

		//3. 입찰한 돈이 충분하다면?
		//무조건 나의포인트는 차감해야한다
		//무조건 나의포인트를 넣기전에 그 전에 제일 높았던 입찰금액을 해당사람에게 돌려줘야한다.
		//3-1. 경매사이트는 최고금액을 보여준다.
		//3-2. 내 화면에서는 최고금액을 보여줌과 동시에 차감된 보유액을 봐야한다.
		//3-3/ 상대방 화면에서는 최고금액을 보여줌과 동시에 복구된 보유액을 볼수있다.






		// DB 에서 일단 멤버가 충분할 돈이 있는지 확인
		auctionBidService.isCharge(memberPk,bidRequest,auctionUUID);
		// 없으면 에러메세지

		// Redis에 아무도 존재하지않다면 DB에서 일단 돈을 뺌 - Redis에 입찰목록에 넣어놓음
		// Redis에서 확인


		// Redis에 존재한다면
		// Redis에서 제일 돈 비싼놈 찾기


		// Redis에 최상단에있는놈의 입찰한돈을 DB에서 다시 넣음
		//
		// 충분할돈이 존재한다면 입찰 목록에 넣음 (DB에서 돈뺌) => 최상단으로 바꿈

		//입찰목록 DB에 넣기


		// {
		//   "firstUser" : "jinseo",  // 최고입찰자
		//   "firstBid" : 10,    // 최고입찰금
		//   "최고입찰자의현재포인트" : 5 // 10 입찰해서 최고입찰자의 포인트가 5로 깎였다는 뜻
		//   "secondUser": "Jaewook",  // 최고입찰자가 등장하기 전의 최고입찰자
		//   "원래금액" : 14 // Jaewook의 원래 포인트
		// }


		template.convertAndSend("/topic/sub/" + auctionUUID);
	}

}
