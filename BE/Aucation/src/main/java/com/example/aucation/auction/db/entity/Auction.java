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

	private long auctionCumtomerPk;
	private String auctionUUID;
	private AuctionStatus auctionStatus;
	private String auctionTitle;
	private String auctionObjectName;
	private String auctionType;
	private int auctionStartPrice;
	private int auctionEndPrice;
	private double auctioMeetingLat;
	private double auctionMeetingLng;
	private String auctionDetail;
	private String auctionStartDate;


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

	@Builder
	public Auction(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
		Long lastModifiedBy, boolean isDeleted, long auctionCumtomerPk, String auctionUUID, AuctionStatus auctionStatus,
		String auctionTitle, String auctionObjectName, String auctionType, int auctionStartPrice, int auctionEndPrice,
		double auctioMeetingLat, double auctionMeetingLng, String auctionDetail,String auctionStartDate,Member member) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		this.auctionCumtomerPk = auctionCumtomerPk;
		this.auctionUUID = auctionUUID;
		this.auctionStatus = auctionStatus;
		this.auctionTitle = auctionTitle;
		this.auctionObjectName = auctionObjectName;
		this.auctionType = auctionType;
		this.auctionStartPrice = auctionStartPrice;
		this.auctionEndPrice = auctionEndPrice;
		this.auctioMeetingLat = auctioMeetingLat;
		this.auctionMeetingLng = auctionMeetingLng;
		this.auctionDetail = auctionDetail;
		this.auctionStartDate = auctionStartDate;
		setMember(member);
	}

	private void setMember(Member member) {
		if(this.member != null) {
			// team에서 해당 Entity를 제거
			this.member.getAuctionList().remove(this);
		}

		// 해당 member Entity에 파라미터로 들어온 team 연관 관계 설정
		this.member = member;

		// 파라미터로 들어온 team Entity에 member 연관 관계 설정
		member.getAuctionList().add(this);
	}
}
