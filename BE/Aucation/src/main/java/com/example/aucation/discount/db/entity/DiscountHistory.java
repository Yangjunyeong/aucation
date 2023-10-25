package com.example.aucation.discount.db.entity;

import java.time.LocalDateTime;

import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.example.aucation.common.entity.BaseEntity;
import com.example.aucation.member.db.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name = "id",column = @Column(name="discount_history_pk"))
public class DiscountHistory extends BaseEntity {

	@Column
	private LocalDateTime HistoryDatetime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn
	private Member member;

	@OneToOne
	@JoinColumn(name="discount_pk")
	private Discount discount;


}
