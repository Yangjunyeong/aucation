package com.example.aucation_chat.chat.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.aucation_chat.common.redis.dto.RedisChatMessage;
import com.example.aucation_chat.chat.api.dto.request.ChatRequest;
import com.example.aucation_chat.chat.api.service.WebSocketChatService;

import lombok.RequiredArgsConstructor;

/**
 * ChatController는 채팅하는 것 자체를 담당함.
 * 웹소켓 기반으로 채팅
 * */
@Controller
@RequiredArgsConstructor
public class WebSocketChat {

	@Autowired
	private SimpMessagingTemplate template; //특정 Broker로 메세지를 전달
	private WebSocketChatService webSocketChatService;

	// 클라이언트가 send 하는 경로
	//stompConfig에서 설정한 applicationDestinationPrefixes와 @MessageMapping 경로가 병합됨
	// /pub/multichat/{crId}
	@MessageMapping("/multichat/{sessionId}")
	public void streamText(@Payload ChatRequest chatRequest,
		@DestinationVariable("sessionId") String sessionId) {

		System.out.println("=======================웹소켓컨트롤러=======================");
		System.out.println("sender: " + chatRequest.getMemberPk());
		System.out.println("content: " + chatRequest.getContent());
		System.out.println("session id: " + sessionId);
		System.out.println("subscribe 주소: /topic/sub/"+sessionId);

		/***** redis에 메세지 저장 후 redis에 저장되는 메세지 객체 리턴*****/
		RedisChatMessage message = webSocketChatService.saveAndReturn(chatRequest, sessionId);

		/**** chat response 생성 ****/
		// ChatResponse response = webSocketChatService.makeResponse(message);

		// 특정 sessionId를 가지는 채팅방에 broad casting
		template.convertAndSend("/topic/sub/" + sessionId, message);
	}
}
