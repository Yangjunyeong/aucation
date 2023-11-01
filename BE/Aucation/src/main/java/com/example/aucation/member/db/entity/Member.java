package com.example.aucation.member.db.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.example.aucation.alarm.db.entity.Alram;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.entity.AuctionBid;
import com.example.aucation.auction.db.entity.AuctionHistory;
import com.example.aucation.chat.db.entity.ChatMessage;
import com.example.aucation.chat.db.entity.ChatParticipants;
import com.example.aucation.common.entity.BaseEntity;
import com.example.aucation.discount.db.entity.Discount;
import com.example.aucation.discount.db.entity.DiscountHistory;
import com.example.aucation.follow.db.entity.Follow;
import com.example.aucation.like.db.entity.LikeAuction;
import com.example.aucation.shop.db.entity.Shop;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "Member")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@AttributeOverrides({
	@AttributeOverride(name = "id", column = @Column(name = "member_pk")),
	@AttributeOverride(name="createdAt",column = @Column(name="member_created_at")),
	@AttributeOverride(name="lastModifiedAt",column = @Column(name="member_update_at"))
})
public class Member extends BaseEntity {

	@Column(unique = true)
	private String memberId;

	@Column
	private String memberPw;

	@Column(unique = true)
	private String memberEmail;

	private int memberPoint;
	private String memberNickname;
	private String memberBanned;
	private String memberRefresh;
	private String memberFCM;

	@Embedded
	private Address address;

	@Enumerated(EnumType.STRING)
	private SocialType socialType;

	@Column
	private Role memberRole;

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

	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
	private List<Auction> auctionOwnerList = new ArrayList<>();

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private List<Auction> auctionCustomerList = new ArrayList<>();

	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<AuctionBid> auctionBidList = new ArrayList<>();

	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
	private List<AuctionHistory> auctionHistoryOwnerList = new ArrayList<>();

	@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
	private List<AuctionHistory> auctionHistoryCustomerList = new ArrayList<>();

//	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
//	private List<Alram> alramList = new ArrayList<>();

	@OneToOne
	@JoinColumn(name = "shop_pk")
	private Shop shop;

	@Builder
	public Member(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
		Long lastModifiedBy, boolean isDeleted, String memberId, String memberPw, String memberEmail,Role memberRole,SocialType socialType,String memberNickname) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		this.memberId = memberId;
		this.memberPw = memberPw;
		this.memberEmail = memberEmail;
		this.memberRole = memberRole;
		this.memberNickname = memberNickname;
		this.socialType = socialType;
	}
	public void updateRefreshToken(String updateRefreshToken) {
		this.memberRefresh = updateRefreshToken;
	}
	public void updatePoint(int point) {
		this.memberPoint=point;
	}

	public int updatePlusPoint(int count) {
		this.memberPoint+=count;
		return this.memberPoint;
	}
}
