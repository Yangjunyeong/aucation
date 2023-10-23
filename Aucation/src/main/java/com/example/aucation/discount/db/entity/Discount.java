package com.example.aucation.discount.db.entity;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.aucation.common.entity.BaseEntity;
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
@AttributeOverride(name = "id",column = @Column(name="discount_pk"))
public class Discount extends BaseEntity {


	private String DiscountTitle;
	private String DiscountObject;
	private int DiscountAuction;
	private String DiscountStatus;
	private String DiscountDetail;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member member;


	private void addMember(Member member){
		if(this.member!=null){
			this.member.getDiscountList().remove(this);
		}
		this.member=member;
		member.getDiscountList().add(this);
	}

}
