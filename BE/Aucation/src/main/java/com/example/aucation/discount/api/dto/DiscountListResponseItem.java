package com.example.aucation.discount.api.dto;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

import org.checkerframework.checker.units.qual.N;

@Getter
@Setter
@NoArgsConstructor
public class DiscountListResponseItem{
	private long discountPk;
	private Boolean isLike; //
	private Long likeCnt;   //
	private String discountTitle; //
	private Integer originalPrice; //
	private Integer discountedPrice;
	private Integer discountRate;
	private String discountOwnerNickname; //
	private LocalDateTime discountEnd;  //
	private String discountImg;  //
}