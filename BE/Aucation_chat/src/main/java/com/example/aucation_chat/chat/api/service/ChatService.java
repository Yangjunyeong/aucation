package com.example.aucation_chat.chat.api.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.aucation_chat.auction.db.entity.Auction;
import com.example.aucation_chat.auction.db.repository.AuctionRepository;
import com.example.aucation_chat.chat.api.dto.response.ChatResponse;
import com.example.aucation_chat.chat.db.entity.ChatMessage;
import com.example.aucation_chat.chat.db.entity.ChatParticipant;
import com.example.aucation_chat.chat.db.entity.ChatRoom;
import com.example.aucation_chat.chat.db.repository.ChatMessageRepository;
import com.example.aucation_chat.chat.db.repository.ChatParticipantRepository;
import com.example.aucation_chat.chat.db.repository.ChatRoomRepository;
import com.example.aucation_chat.common.error.ApplicationError;
import com.example.aucation_chat.common.error.NotFoundException;
import com.example.aucation_chat.common.redis.dto.RedisChatMessage;
import com.example.aucation_chat.common.util.DateFormatPattern;
import com.example.aucation_chat.member.db.entity.Member;
import com.example.aucation_chat.member.db.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {

	private final ChatRoomRepository chatRoomRepository;
	private final ChatMessageRepository chatMessageRepository;
	private final ChatParticipantRepository chatParticipantRepository;
	private final MemberRepository memberRepository;
	private final AuctionRepository auctionRepository;
	@Autowired
	private final RedisTemplate<String, RedisChatMessage> redisTemplate;

	/**
	 * 채팅 목록 보여줌
	 * */
	public List<RedisChatMessage> enter(String auctionUUID, long memberPk) {
		// auctionUUID로 채팅방 찾고 없으면 생성
		ChatRoom chatRoom = findChatRoomByUUID(auctionUUID).orElse(createNotExistChatRoom(auctionUUID));

		// 참여한 적 없다면 참여자로 생성
		participate(memberPk, chatRoom);

		// redis에서 채팅 내역 빼오기
		List<RedisChatMessage> redisChatMessages = redisTemplate.opsForList().range("chat-auc:" + auctionUUID, 0, -1);

		// 채팅 내역 있으면 반환
		if (!redisChatMessages.isEmpty()) {
			return redisChatMessages;
		}
		// 채팅 내역 없으면 MySQL에서 찾아오기 : Read-through --------
		else {
			return readThrough(auctionUUID);
		} // Read-Through 끝

	}

	private void participate(long memberPk, ChatRoom chatRoom) {
		// memberPk로 유효성검사
		memberRepository.findByMemberPk(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		// member가 지금 채팅방에 들어가있는지 검사
		Optional<ChatParticipant> temp = chatParticipantRepository.findByChatRoom_ChatPkAndAndMemberPk(chatRoom.getChatPk(), memberPk);
		// 안들어가 있을때만 participant로 insert
		if(temp.isEmpty()) {
			ChatParticipant chatParticipant = ChatParticipant.builder()
				.chatRoom(chatRoom)
				.memberPk(memberPk)
				.particiJoin(LocalDateTime.now())
				.build();
			chatParticipantRepository.save(chatParticipant);
		}
	}

	private Optional<ChatRoom> findChatRoomByUUID(String auctionUUID) {
		Auction searchedAuction = auctionRepository.findByAuctionUUID(auctionUUID)
			.orElseThrow(() -> new NotFoundException(ApplicationError.AUCTION_NOT_FOUND));
		Optional<ChatRoom> chatRoom = chatRoomRepository.findByChatSession(auctionUUID);
		return chatRoom;
	}

	private ChatRoom createNotExistChatRoom(String auctionUUID) {
		ChatRoom temp = ChatRoom.builder()
			.chatSession(auctionUUID)
			.chatCreate(LocalDateTime.now())
			.build();
		chatRoomRepository.save(temp);
		return temp;
	}

	private List<RedisChatMessage> readThrough(String auctionUUID) {
    /*
		1. MySQL에서 chatMessage들 가져오기
		- auctionUUID로 chatPk 찾아서 chatPk로 chat_message 테이블 조회
	*/
		ChatRoom searchedChat = chatRoomRepository.findByChatSession(auctionUUID)
			.orElseThrow(() -> new NotFoundException(
				ApplicationError.CHATTING_ROOM_NOT_FOUND));
		// ChatRoom searchedChat = chatRoomRepository.findByChatSession(auctionUUID)

		List<ChatMessage> chatList = chatMessageRepository.findTop50ByChatRoom_ChatPk_OrderByMessageTimeDesc(
			searchedChat.getChatPk());

		// 2. MySQL 에도 없음 => 새로 만들어진 채팅방이라는 뜻
		if (chatList.isEmpty())
			return null;

		// 3. MySQL에 있음 => Redis에 저장 후 반환
		List<RedisChatMessage> dbToRedisChats = new ArrayList<>(); // MySQL에서 redis에 들어갈 채팅메세지들

		// chat entity -> redis -> 저장&반환
		for (int i = chatList.size() - 1; i > 0; i--) { //DB에서 보낸시간 기반 내림차순해서 가져왔기 때문에 뒤에서부터 조회해 오름차순으로 넣어야함

			// message의 memberPk로 닉네임 찾아야함
			Member member = memberRepository.findByMemberPk(chatList.get(i).getMemberPk())
				.orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));

			// 보낸시간을 string으로 바꾸어야 함
			String messageTime = chatList.get(i).getMessageTime()
				.format(DateTimeFormatter.ofPattern(DateFormatPattern.get()));

			// MySQL데이터를 Redis로 옮기는 과정
			RedisChatMessage temp = RedisChatMessage.builder()
				.memberPk(chatList.get(i).getMemberPk())
				.messageContent(chatList.get(i).getMessageContent())
				.memberNickname(member.getMemberNickname())
				.messageTime(messageTime)
				.imageURL(member.getImageURL())
				.build();

			dbToRedisChats.add(temp);
			// redisTemplate.opsForList().rightPush(auctionUUID, temp);
		}
		redisTemplate.opsForList().rightPushAll("chat-auc:" + auctionUUID, dbToRedisChats);
		redisTemplate.expire("chat-auc:" + auctionUUID, 30, TimeUnit.MINUTES); // 30분 TTL설정
		return dbToRedisChats;
	}

}
