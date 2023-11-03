package com.example.aucation_chat.chat.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.aucation_chat.chat.db.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
	Optional<ChatRoom> findByChatPk(long chatPk);

	Optional<ChatRoom> findByChatSession(String chatSession);
}
