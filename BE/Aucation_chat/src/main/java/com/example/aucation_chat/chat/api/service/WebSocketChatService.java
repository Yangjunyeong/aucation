package com.example.aucation_chat.chat.api.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.aucation_chat.common.error.ApplicationError;
import com.example.aucation_chat.common.error.NotFoundException;
import com.example.aucation_chat.common.redis.dto.RedisChatMessage;
import com.example.aucation_chat.chat.api.dto.request.ChatRequest;
import com.example.aucation_chat.chat.api.dto.response.ChatResponse;
import com.example.aucation_chat.common.util.DateFormatPattern;
import com.example.aucation_chat.member.db.entity.Member;
import com.example.aucation_chat.member.db.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class WebSocketChatService {

	private final MemberRepository memberRepository;

	@Autowired
	private final RedisTemplate<String, RedisChatMessage> redisTemplate;

	/** redis에 메세지 저장 후 redis에 저장되는 메세지 객체 리턴
	 *  @param chatRequest  웹소켓 채팅에서 온 객체
	 * @param sessionId = auctionUUID
	 * */
	public RedisChatMessage saveAndReturn(ChatRequest chatRequest, String sessionId){
		// request에 담긴 member pk 로 정보들
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
			.build();

		redisTemplate.opsForList().rightPush("chat-auc:"+sessionId, message);
		setTTL(sessionId); // 첫 push 였다면 TTL 설정
		return message;
	}

	private void setTTL(String sessionId) {
		if(redisTemplate.opsForList().size("chat-auc:"+sessionId)==1) { // O(1)시간에 .size() 수행
			redisTemplate.expire("chat-auc:" + sessionId, 30, TimeUnit.MINUTES); // 30분 TTL설정
		}
	}
}
