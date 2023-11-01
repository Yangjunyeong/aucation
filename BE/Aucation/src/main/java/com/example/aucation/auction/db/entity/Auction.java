package com.example.aucation.auction.db.entity;

import java.time.LocalDateTime;
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
import lombok.Builder;
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


	private String auctionUUID;
	private AuctionStatus auctionStatus;
	private String auctionTitle;
	private String auctionType;
	private int auctionStartPrice;
	private int auctionEndPrice;
	private double auctionMeetingLat;
	private double auctionMeetingLng;
	private String auctionDetail;
	private String auctionStartDate;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="auction_owner_pk")
	private Member owner;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="auction_customer_pk")
	private Member customer;

	@OneToMany(mappedBy = "auction", cascade = CascadeType.PERSIST)
	private List<AuctionBid> auctionBidList = new ArrayList<>();

	@OneToMany(mappedBy = "auction", cascade = CascadeType.PERSIST)
	private List<LikeAuction> likeAuctionList = new ArrayList<>();

	@Builder
	public Auction(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
		Long lastModifiedBy, boolean isDeleted, String auctionUUID, AuctionStatus auctionStatus,
		String auctionTitle, String auctionType, int auctionStartPrice, int auctionEndPrice,
		double auctioMeetingLat, double auctionMeetingLng, String auctionDetail,String auctionStartDate,Member owner
			,Member customer) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		this.auctionUUID = auctionUUID;
		this.auctionStatus = auctionStatus;
		this.auctionTitle = auctionTitle;
		this.auctionType = auctionType;
		this.auctionStartPrice = auctionStartPrice;
		this.auctionEndPrice = auctionEndPrice;
		this.auctionMeetingLat = auctioMeetingLat;
		this.auctionMeetingLng = auctionMeetingLng;
		this.auctionDetail = auctionDetail;
		this.auctionStartDate = auctionStartDate;
		setOwner(owner);
		setCustomer(customer);
	}

	private void setOwner(Member owner) {
		if(this.owner != null) {
			// team에서 해당 Entity를 제거
			this.owner.getAuctionOwnerList().remove(this);
		}
		// 해당 member Entity에 파라미터로 들어온 team 연관 관계 설정
		this.owner = owner;
		// 파라미터로 들어온 team Entity에 member 연관 관계 설정
		owner.getAuctionOwnerList().add(this);
	}

	private void setCustomer(Member customer) {
		if(this.customer != null) {
			// team에서 해당 Entity를 제거
			this.customer.getAuctionCustomerList().remove(this);
		}
		// 해당 member Entity에 파라미터로 들어온 team 연관 관계 설정
		this.customer = customer;
		// 파라미터로 들어온 team Entity에 member 연관 관계 설정
		customer.getAuctionCustomerList().add(this);
	}



	public void updateAuctionToEnd(int endPrice, Member customer) {
		this.auctionEndPrice = endPrice;
		setCustomer(customer);
	}

	public void updateAuctionToEndCustomerIsNone(int auctionEndPrice) {
		this.auctionEndPrice = auctionEndPrice;
	}
}
