package com.example.aucation.auction.db.entity;

import com.example.aucation.member.db.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class ReAuctionBid {
	@Id
	private String reAucBidPk;
	private int reAucBidPrice;
	private LocalDateTime reAucBidDatetime;
	private String reAucBidDetail;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Auction auction;

	@Builder
	public ReAuctionBid(String reAucBidPk, int reAucBidPrice, LocalDateTime reAucBidDatetime, String reAucBidDetail, Member member, Auction auction) {
		this.reAucBidPk = reAucBidPk;
		this.reAucBidPrice = reAucBidPrice;
		this.reAucBidDatetime = reAucBidDatetime;
		this.reAucBidDetail = reAucBidDetail;
		addMember(member);
		addAuction(auction);
	}

	private void addAuction(Auction auction) {
		if (this.auction != null) {
			this.auction.getReAuctionBidList().remove(this);
		}
		this.auction = auction;
		auction.getReAuctionBidList().add(this);
	}

	private void addMember(Member member) {
		if (this.member != null) {
			this.member.getReAuctionBidList().remove(this);
		}
		this.member = member;
		member.getReAuctionBidList().add(this);
	}

}
