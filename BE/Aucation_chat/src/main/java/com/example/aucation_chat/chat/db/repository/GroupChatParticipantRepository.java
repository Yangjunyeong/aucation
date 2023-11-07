package com.example.aucation_chat.chat.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.aucation_chat.chat.db.entity.GroupChatParticipant;

public interface GroupChatParticipantRepository extends JpaRepository<GroupChatParticipant, Long> {
	List<GroupChatParticipant> findByChatRoom_ChatPk(long chatPk);
	Optional<GroupChatParticipant> findByChatRoom_ChatPkAndAndMemberPk(long chatPk, long memberPk);
}
