package com.example.aucation_chat.chat.api.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import com.example.aucation_chat.common.error.ApplicationError;
import com.example.aucation_chat.common.error.NotFoundException;
import com.example.aucation_chat.common.redis.dto.RedisChatMessage;
import com.example.aucation_chat.chat.api.dto.request.ChatRequest;
import com.example.aucation_chat.chat.api.dto.response.ChatResponse;
import com.example.aucation_chat.common.redis.pubsub.RedisSubscriber;
import com.example.aucation_chat.common.util.DateFormatPattern;
import com.example.aucation_chat.member.db.entity.Member;
import com.example.aucation_chat.member.db.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class WebSocketChatService {

	@Autowired
	private final RedisTemplate<String, RedisChatMessage> redisTemplate;
	
	private final MemberRepository memberRepository;

	// 쪽지방(topic)에 발행되는 메시지 처리하는 리스너
	private final RedisMessageListenerContainer redisMessageListener;

	// 구독 처리 서비스
	private final RedisSubscriber redisSubscriber;

	private static final String Message_Rooms = "MESSAGE_ROOM";
	
	// redis의 hash 데이터를 다루기 위함
	private HashOperations<String, String, RedisChatMessage> opsHashMessageRoom;

	// 쪽지방의 대화 메시지 발행을 위한 redis topic(쪽지방) 정보
	private Map<String, ChannelTopic> topics;

	// redis의 hash데이터를 다루기 위해 bean이 생성될 때 실행
	@PostConstruct
	private void init() {
		opsHashMessageRoom = redisTemplate.opsForHash();
		topics = new HashMap<>();
	}

	//////////////////////////////////////////////////////////////////////////////////////////////

	/** redis에 메세지 저장 후 redis에 저장되는 메세지 객체 리턴
	 *  @param chatRequest  웹소켓 채팅에서 온 객체
	 * @param sessionId = auctionUUID
	 * */
	public ChatResponse saveAndReturn(ChatRequest chatRequest, String sessionId){
		// request에 담긴 member pk 로 보낸사람 정보 추출
		Member member = memberRepository.findByMemberPk(chatRequest.getMemberPk())
			.orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		String nickname = member.getMemberNickname();
		String imageURL = member.getImageURL();
		// 전송시간 기록
		String messageTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern(DateFormatPattern.get()));

		// RedisChatMessage로 만들어 redis에 저장
		RedisChatMessage message = RedisChatMessage.builder()
			.memberPk(chatRequest.getMemberPk())
			.memberNickname(nickname)
			.messageContent(chatRequest.getContent())
			.imageURL(imageURL)
			.messageTime(messageTime)
			.cachedFromDB(false)
			.build();

		// redis에 저장
		redisTemplate.opsForList().rightPush("chat-auc:"+sessionId, message);
		setTTL(sessionId); // 첫 push 였다면 TTL 설정

		// RedisChatMessage -> ChatResponse
		ChatResponse res = ChatResponse.builder()
			.memberPk(chatRequest.getMemberPk())
			.memberNickname(nickname)
			.messageContent(chatRequest.getContent())
			.imageURL(imageURL)
			.messageTime(messageTime)
			.build();
		return res;
	}

	private void setTTL(String sessionId) {
		if(redisTemplate.opsForList().size("chat-auc:"+sessionId)==1) { // O(1)시간에 .size() 수행
			redisTemplate.expire("chat-auc:" + sessionId, 30, TimeUnit.MINUTES); // 30분 TTL설정
		}
	}

	
}
