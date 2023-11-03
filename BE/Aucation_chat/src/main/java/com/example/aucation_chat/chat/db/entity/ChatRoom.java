package com.example.aucation_chat.chat.db.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name="chat_room")
public class ChatRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "chat_pk")
	private long chatPk;

	@Column(name = "chat_session")
	private String chatSession;

	@CreatedDate
	@Column(name="chat_create")
	private LocalDateTime chatCreate = LocalDateTime.now();

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "chat_end")
	private LocalDateTime chatEnd;

	////////////////////////////////////////////////////
	@OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
	List<ChatParticipant> chatParticipants = new ArrayList<ChatParticipant>();

	@OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
	List<ChatMessage> chatMessages = new ArrayList<ChatMessage>();


	@Builder
	public ChatRoom(long chatPk, String chatSession, LocalDateTime chatCreate, LocalDateTime chatEnd) {
		this.chatPk = chatPk;
		this.chatSession = chatSession;
		this.chatCreate = chatCreate;
		this.chatEnd = chatEnd;
	}
}
