package com.example.aucation.chat.db.entity;

import java.time.LocalDateTime;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.aucation.auction.db.entity.Auction;
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
@AttributeOverrides({
	@AttributeOverride(name = "id", column = @Column(name = "chat_partici_pk")),
	@AttributeOverride(name="createdAt", column = @Column(name ="partici_join")),
	@AttributeOverride(name="lastModifiedAt", column = @Column(name ="partici_exit")),
})
public class ChatParticipants extends BaseEntity {


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private ChatRoom chatRoom;

	@Builder
	public ChatParticipants(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
		Long lastModifiedBy, boolean isDeleted, Member member, ChatRoom chatRoom) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		addMember(member);
		addChatRoom(chatRoom);
	}

	private void addChatRoom(ChatRoom chatRoom) {
		if(this.chatRoom!= null){
			this.chatRoom.getChatParticipantsList().remove(this);
		}
		this.chatRoom=chatRoom;
		chatRoom.getChatParticipantsList().add(this);
	}


	private void addMember(Member member){
		if(this.member!= null){
			this.member.getChatParticipantsList().remove(this);
		}
		this.member=member;
		member.getChatParticipantsList().add(this);
	}

}
