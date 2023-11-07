package com.example.aucation_chat.reauction.db.entity;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.aucation_chat.auction.db.entity.Auction;
import com.example.aucation_chat.member.db.entity.Member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "ReAuctionBid")
@Getter
@Setter
@NoArgsConstructor
public class ReAuctionBid {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "re_auc_bid_photo_pk")
	private	long id;

	private int reAucBidPrice;
	private LocalDateTime reAucBidDatetime;
	private String reAucBidDetail;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Auction auction;
	// @OneToMany(mappedBy = "reAuctionBid", cascade = CascadeType.PERSIST)
	// List<ReAucBidPhoto> reAucBidPhotoList = new ArrayList<>();
}
