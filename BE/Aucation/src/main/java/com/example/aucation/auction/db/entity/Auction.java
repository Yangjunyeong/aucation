package com.example.aucation.auction.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.example.aucation.chat.db.entity.ChatRoom;
import com.example.aucation.common.entity.BaseEntity;
import com.example.aucation.like.db.entity.LikeAuction;
import com.example.aucation.member.db.entity.Member;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AttributeOverrides({
	@AttributeOverride(name = "id",column = @Column(name="auction_pk")),
	@AttributeOverride(name="createdAt",column = @Column(name="auction_created_at"))
})
public class Auction extends BaseEntity {


	private long AuctionCumtomerPk;
	private AuctionStatus auctionStatus;
	private String AuctionTitle;
	private String AuctionObjectName;
	private String AuctionType;
	private int AuctionStartPrice;
	private int AuctionEndPrice;
	private double AuctioMeetingLat;
	private double AuctionMeetingLng;
	private double AuctionDetail;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member member;

	@OneToMany(mappedBy = "auction", cascade = CascadeType.PERSIST)
	private List<AuctionBid> auctionBidList = new ArrayList<>();

	@OneToMany(mappedBy = "auction", cascade = CascadeType.PERSIST)
	private List<LikeAuction> likeAuctionList = new ArrayList<>();

	@OneToOne
	@JoinColumn(name = "auction_chat_pk")
	private ChatRoom chatRoom;
	
}
