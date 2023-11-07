package com.example.aucation_chat.common.redis.pubsub;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.example.aucation_chat.common.redis.dto.RedisChatMessage;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisSubscriber implements MessageListener {
	private final ObjectMapper objectMapper;
	private final RedisTemplate redisTemplate;
	private final SimpMessageSendingOperations messagingTemplate;

	// 2. Redis 에서 메시지가 발행(publish)되면, listener 가 해당 메시지를 읽어서 처리
	@Override
	public void onMessage(Message message, byte[] pattern) { // 메세지 수신할 때마다 호출
		try {
			// Redis에서 발행된 메시지의 채널 이름을 가져오는 부분
			String channel = new String(message.getChannel());

			// redis 에서 발행된 데이터를 받아 역직렬화
			String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());

			// 해당 객체를 RedisChatMessage 객체로 맵핑
			RedisChatMessage chat = objectMapper.readValue(publishMessage, RedisChatMessage.class);

			// Websocket 구독자에게 채팅 메시지 전송
			messagingTemplate.convertAndSend("/topic/sub/" + channel,  chat);
		} catch (Exception e) {
			log.error(e.getMessage());
		}
	}
}
