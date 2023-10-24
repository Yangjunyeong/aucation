package com.example.aucation.like.db.entity;

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
@AttributeOverrides({
	@AttributeOverride(name = "id",column = @Column(name="like_pk")),
	@AttributeOverride(name="createdAt",column = @Column(name="like_creaetd_at"))
})

public class LikeAuction extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Auction auction;

	@Builder
	public LikeAuction(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
		Long lastModifiedBy, boolean isDeleted, Member member, Auction auction) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		addMember(member);
		addAuction(auction);
	}

	private void addAuction(Auction auction) {
		if(this.auction!= null){
			this.auction.getLikeAuctionList().remove(this);
		}
		this.auction=auction;
		auction.getLikeAuctionList().add(this);
	}

	private void addMember(Member member){
		if(this.member!= null){
			this.member.getLikeAuctionList().remove(this);
		}
		this.member=member;
		member.getLikeAuctionList().add(this);
	}
}
