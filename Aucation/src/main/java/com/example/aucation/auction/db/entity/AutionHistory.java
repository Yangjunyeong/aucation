package com.example.aucation.auction.db.entity;

import java.time.LocalDateTime;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.example.aucation.common.entity.BaseEntity;
import com.example.aucation.member.db.entity.Member;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AttributeOverride(name = "id",column = @Column(name="auction_history_pk"))
public class AutionHistory extends BaseEntity {

	private LocalDateTime HistoryDateTime;


	@OneToOne
	@JoinColumn(name="history_pk")
	private Auction auction;

	@ManyToOne
	@JoinColumn
	private Member member;

	@Builder
	public AutionHistory(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
		Long lastModifiedBy, boolean isDeleted, LocalDateTime historyDateTime, Auction auction, Member member) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		HistoryDateTime = historyDateTime;
		this.member=member;
		addMember(member);
	}

	private void addMember(Member member){
		if(this.member!= null){
			this.member.getAutionHistoryList().remove(this);
		}
		this.member=member;
		member.getAutionHistoryList().add(this);
	}
}
