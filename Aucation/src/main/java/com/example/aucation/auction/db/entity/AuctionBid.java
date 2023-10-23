package com.example.aucation.auction.db.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
@AttributeOverride(name = "id",column = @Column(name="auction_bid_pk"))
public class AuctionBid extends BaseEntity {

	private int AuctionBidPrice;
	private LocalDateTime AuctionBidDatetime;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Auction auction;

	@Builder
	public AuctionBid(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
		Long lastModifiedBy, boolean isDeleted, Member member, Auction auction) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		addMember(member);
		addAuction(auction);
	}

	private void addAuction(Auction auction) {
		if(this.auction!= null){
			this.auction.getAuctionBidList().remove(this);
		}
		this.auction=auction;
		auction.getAuctionBidList().add(this);
	}

	private void addMember(Member member){
		if(this.member!= null){
			this.member.getAuctionBidList().remove(this);
		}
		this.member=member;
		member.getAuctionBidList().add(this);
	}

}
