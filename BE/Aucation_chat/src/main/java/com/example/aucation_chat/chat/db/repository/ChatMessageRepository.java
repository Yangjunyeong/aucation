package com.example.aucation_chat.chat.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.aucation_chat.chat.db.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
	List<ChatMessage> findByChatRoom_ChatPk(long chatPk);

	/** 메세지 전송시간을 기반으로 내림차순 정렬함으로써 최신 메세지 50개까지 조회 */
	List<ChatMessage> findTop50ByChatRoom_ChatPk_OrderByMessageTimeDesc(long chatPk);

}
