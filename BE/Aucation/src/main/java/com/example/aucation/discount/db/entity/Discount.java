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
	private String discountCategory;
	private LocalDateTime discountStart;
	private LocalDateTime discountEnd;
	private int discountPrice;
	private String discountDetail;
	private int discountDiscountedPirce;
	private String discountImgURL;
	private String discountUUID;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member owner;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member customer;

	@Builder
	public Discount(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt, Long lastModifiedBy,
		boolean isDeleted, String discountTitle, String discountCategory, LocalDateTime discountStart,
		LocalDateTime discountEnd, int discountPrice, String discountDetail, int discountDiscountedPirce,
		String discountImgURL, String discountUUID, Member owner) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		this.discountTitle = discountTitle;
		this.discountCategory = discountCategory;
		this.discountStart = discountStart;
		this.discountEnd = discountEnd;
		this.discountPrice = discountPrice;
		this.discountDetail = discountDetail;
		this.discountDiscountedPirce = discountDiscountedPirce;
		this.discountImgURL = discountImgURL;
		this.discountUUID = discountUUID;
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
