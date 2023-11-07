package com.example.aucation.discount.db.entity;

import java.time.LocalDateTime;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
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

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AttributeOverrides({
	@AttributeOverride(name = "id", column = @Column(name = "discount_pk")),
	@AttributeOverride(name = "createdAt", column = @Column(name = "discount_created_at"))
})
public class Discount extends BaseEntity {

	private String discountTitle;
	private String discountType;
	private double discountLng;
	private double discountLat;
	private LocalDateTime discountStart;
	private LocalDateTime discountEnd;
	private int discountPrice;
	private String discountDetail;
	private int discountDiscountedPrice;
	private String discountImgURL;
	private String discountUUID;
	private int discountRate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member owner;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member customer;

	@Builder
	public Discount(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt, Long lastModifiedBy,
		boolean isDeleted, String discountTitle, String discountType, double discountLng, double discountLat,
		LocalDateTime discountStart, LocalDateTime discountEnd, int discountPrice, String discountDetail,
		int discountDiscountedPrice, String discountImgURL, String discountUUID, int discountRate, Member owner) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		this.discountTitle = discountTitle;
		this.discountType = discountType;
		this.discountLng = discountLng;
		this.discountLat = discountLat;
		this.discountStart = discountStart;
		this.discountEnd = discountEnd;
		this.discountPrice = discountPrice;
		this.discountDetail = discountDetail;
		this.discountDiscountedPrice = discountDiscountedPrice;
		this.discountImgURL = discountImgURL;
		this.discountUUID = discountUUID;
		this.discountRate = discountRate;
		addMember(owner);
	}

	private void addMember(Member member) {
		if (this.owner != null) {
			this.owner.getDiscountOwnerList().remove(this);
		}
		this.owner = member;
		member.getDiscountCustomerList().add(this);
	}

}
