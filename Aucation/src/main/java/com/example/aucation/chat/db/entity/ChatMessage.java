package com.example.aucation.chat.db.entity;

import java.time.LocalDateTime;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.aucation.common.entity.BaseEntity;
import com.example.aucation.member.db.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "chat_message_pk"))
public class ChatMessage extends BaseEntity {

	private String MessageBody;
	private LocalDateTime MessageTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private ChatRoom chatRoom;

	@Builder
	public ChatMessage(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
		Long lastModifiedBy, boolean isDeleted, Member member, ChatRoom chatRoom) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		addMember(member);
		addChatRoom(chatRoom);
	}

	private void addChatRoom(ChatRoom chatRoom) {
		if(this.chatRoom!= null){
			this.chatRoom.getChatMessageList().remove(this);
		}
		this.chatRoom=chatRoom;
		chatRoom.getChatMessageList().add(this);
	}


	private void addMember(Member member){
		if(this.member!= null){
			this.member.getChatMessageList().remove(this);
		}
		this.member=member;
		member.getChatMessageList().add(this);
	}
}

