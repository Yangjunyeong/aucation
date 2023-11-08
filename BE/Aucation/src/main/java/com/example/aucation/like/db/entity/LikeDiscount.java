package com.example.aucation.like.db.entity;

import java.time.LocalDateTime;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.common.entity.BaseEntity;
import com.example.aucation.discount.db.entity.Discount;
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
	@AttributeOverride(name = "id",column = @Column(name="like_pk")),
	@AttributeOverride(name="createdAt",column = @Column(name="like_creaetd_at"))
})
@Table(name = "discount_like")
public class LikeDiscount extends BaseEntity {
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	Discount discount;

	private void addMember(Member member) {
		if(this.member!= null){
			this.member.getLikeDiscountList().remove(this);
		}
		this.member=member;
		member.getLikeDiscountList().add(this);
	}

	private void addDiscount (Discount discount) {
		if(this.discount!= null){
			this.discount.getLikeDiscountList().remove(this);
		}
		this.discount=discount;
		discount.getLikeDiscountList().add(this);
	}

	@Builder
	public LikeDiscount(Long id, LocalDateTime createdAt, Long createdBy, LocalDateTime lastModifiedAt,
		Long lastModifiedBy, boolean isDeleted, Member member, Discount discount) {
		super(id, createdAt, createdBy, lastModifiedAt, lastModifiedBy, isDeleted);
		this.member = member;
		this.discount = discount;
	}
}
