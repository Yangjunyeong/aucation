package com.example.aucation_chat.chat.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import com.example.aucation_chat.chat.api.dto.request.ChatRequestPubSub;
import com.example.aucation_chat.chat.db.entity.personal.ChatRoom;
import com.example.aucation_chat.chat.db.repository.personal.ChatRoomRepository;
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

	private final ChatRoomRepository chatRoomRepository;

	// 쪽지방(topic)에 발행되는 메시지 처리하는 리스너
	private final RedisMessageListenerContainer redisMessageListener;

	// 구독 처리 서비스
	private final RedisSubscriber redisSubscriber;

	private static final String Message_Rooms = "MESSAGE_ROOM";

	// // redis의 hash 데이터를 다루기 위함
	// private HashOperations<String, String, RedisChatMessage> opsHashMessageRoom;

	// 쪽지방의 대화 메시지 발행을 위한 redis topic(쪽지방) 정보
	private Map<String, ChannelTopic> topics;

	// redis의 hash데이터를 다루기 위해 bean이 생성될 때 실행
	@PostConstruct
	private void init() {
		// opsHashMessageRoom = redisTemplate.opsForHash();
		topics = new HashMap<>();
	}

	//////////////////////////////////////////////////////////////////////////////////////////////

	/** redis에 메세지 저장 후 redis에 저장되는 메세지 객체 리턴
	 *  @param chatRequest  웹소켓 채팅에서 온 객체
	 * @param sessionId = auctionUUID
	 * */
	public ChatResponse saveAndReturn(ChatRequest chatRequest, String sessionId) {
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
		redisTemplate.opsForList().rightPush("chat-auc:" + sessionId, message);
		setTTL("chat-auc:",sessionId); // 첫 push 였다면 TTL 설정

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

	public RedisChatMessage saveAndReturn2(ChatRequestPubSub chatRequest) {
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
		String redisKeyBase = getRedisKeyBase(chatRequest.getChatSession());
		redisTemplate.opsForList().rightPush(redisKeyBase + chatRequest.getChatSession(), message);
		setTTL(redisKeyBase, chatRequest.getChatSession()); // 첫 push 였다면 TTL 설정

		return message;
	}

	private void setTTL(String redisKeyBase, String sessionId) {
		if (redisTemplate.opsForList().size(redisKeyBase + sessionId) == 1) { // O(1)시간에 .size() 수행
			redisTemplate.expire(redisKeyBase + sessionId, 30, TimeUnit.MINUTES); // 30분 TTL설정
		}
	}

	/* ----------------------------- PUB/SUB --------------------------------------*/

	/** 쪽지방 입장할 떄 topic 생성 */
	public void createTopic(String chatSession) {
		ChannelTopic topic = topics.get(chatSession);
		String redisKeyBase="";

		if (topic == null) {
			// chatSession을 가지는 key를 이용한 topic 생성
			redisKeyBase = getRedisKeyBase(chatSession);
			topic = new ChannelTopic(redisKeyBase + chatSession);
			redisMessageListener.addMessageListener(redisSubscriber, topic);  // pub/sub 통신을 위해 리스너를 설정. 대화가 가능해진다
			log.info("**************** createTopic: " + topic + " listening ");
			topics.put(chatSession, topic);
		}
	}

	// redis 채널에서 쪽지방 조회
	public ChannelTopic getTopic(String roomId) {
		return topics.get(roomId);
	}

	/** chatSession에 따라 redis의 key 앞부분이 달라짐 */
	private String getRedisKeyBase(String chatSession) {
		String redisKeyBase;
		ChatRoom chatRoom = chatRoomRepository.findByChatSession(chatSession)
			.orElseThrow(() -> new NotFoundException(ApplicationError.CHATTING_ROOM_NOT_FOUND));
		int prodType= chatRoom.getProdType();
		if(prodType == 0)  // 경매장일 때
			redisKeyBase = "chat-bid:";
		else if(prodType == 1)
			redisKeyBase = "chat-re-bid:";
		else
			redisKeyBase = "chat-dis:";
		return redisKeyBase;
	}
	/* ----------------------------- PUB/SUB --------------------------------------*/

}
