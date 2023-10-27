package com.example.aucation.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

//@Configuration
//// @EnableWebSocket // 웹소켓 활성화
//@EnableWebSocketMessageBroker
//public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
//
//	// stomp 설정
//	// sockJS Fallback을 이용해 노출할 endpoint 설정
//	@Override
//	public void registerStompEndpoints(StompEndpointRegistry registry) {
//
//		// 웹소켓, sockjs 클라이언트가 웹소켓 "핸드셰이크" 커넥션 생성 경로
//		registry.addEndpoint("/ws")
//			// .setAllowedOrigins("*")
//			.setAllowedOriginPatterns("*")
//			.withSockJS();
//	}
//
//	//메세지 브로커에 관한 설정
//	@Override
//	public void configureMessageBroker(MessageBrokerRegistry config) {
//
//		// 클라이언트->서버로 발행하는 메세지에 대한 endpoint 설정 : 구독에 대한 메세지
//		// /app 경로로 시작하는 stomp메세지의 destination헤더는 @Controller객체의 @MesssageMapping 메소드로 라우팅.
//		// 애플리케이션(서버)로 와야되는 주소의 맨 앞에 붙는 거라고 생각하면 됨
//		config.setApplicationDestinationPrefixes("/app");
//
//		// 서버 -> 클라이언트로 발행하는 메세지에 대한 endpoint 설정 : 구독
//		// /topic, /queue로 시작하는 destination헤더를 가진 메세지를 브로커로 라우팅
//		// 해당 경로를 subscribe하는 클라이언트에게 메세지 전달
//		// /topic은 1:N, /queue는 1:1 <= 꼭 지키는 규칙은 아님
//		config.enableSimpleBroker("/topic", "/queue");
//	}
//}