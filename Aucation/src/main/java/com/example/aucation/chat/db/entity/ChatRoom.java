package com.example.aucation.chat.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import com.example.aucation.common.entity.BaseEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "chat_room_pk"))
public class ChatRoom extends BaseEntity {

	@Column
	private String ChatSession;

	@OneToMany(mappedBy = "chatRoom", cascade = CascadeType.PERSIST)
	private List<ChatParticipants> chatParticipantsList = new ArrayList<>();

	@OneToMany(mappedBy = "chatRoom", cascade = CascadeType.PERSIST)
	private List<ChatMessage> chatMessageList = new ArrayList<>();

}
