package com.example.aucation.member.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.example.aucation.alarm.db.entity.Alram;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.entity.AuctionBid;
import com.example.aucation.auction.db.entity.AutionHistory;
import com.example.aucation.chat.db.entity.ChatMessage;
import com.example.aucation.chat.db.entity.ChatParticipants;
import com.example.aucation.common.entity.BaseEntity;
import com.example.aucation.discount.db.entity.Discount;
import com.example.aucation.discount.db.entity.DiscountHistory;
import com.example.aucation.follow.db.entity.Follow;
import com.example.aucation.like.db.entity.LikeAuction;
import com.example.aucation.shop.db.entity.Shop;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "member_pk"))
public class Member extends BaseEntity {

	@Column(unique = true)
	private String MemberId;

	@Column
	private String MemberPw;

	@Column(unique = true)
	private String MemberEmail;

	private int MemberPoint;
	private String MemberNickname;
	private String MemberBanned;
	private String MemeberRefresh;
	private String MemberFCM;

	@Embedded
	private Address address;

	@Column
	private Role MemberRole;

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<Follow> followList = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<Discount> discountList = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<DiscountHistory> discountHistoryList = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<ChatMessage> chatMessageList = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<ChatParticipants> chatParticipantsList = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<LikeAuction> likeAuctionList = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<Auction> auctionList = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<AuctionBid> auctionBidList = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<AutionHistory> autionHistoryList = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<Alram> alramList = new ArrayList<>();

	@OneToOne
	@JoinColumn(name = "shop_pk")
	private Shop shop;

}
