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
	private String discountObject;
	private int discountAuction;
	private String discountStatus;
	private String discountDetail;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member member;

	@Builder
	public Discount(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
		Long lastModifiedBy, boolean isDeleted, String discountTitle, String discountObject, int discountAuction,
		String discountStatus, String discountDetail, Member member) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		this.discountTitle = discountTitle;
		this.discountObject = discountObject;
		this.discountAuction = discountAuction;
		this.discountStatus = discountStatus;
		this.discountDetail = discountDetail;
		addMember(member);
	}

	private void addMember(Member member) {
		if (this.member != null) {
			this.member.getDiscountList().remove(this);
		}
		this.member = member;
		member.getDiscountList().add(this);
	}

}
