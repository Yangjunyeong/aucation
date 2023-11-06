package com.example.aucation.discount.api.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiscountRequest {
	private String discountTitle;
	private String discountCategory;
	private int discountEnd;
	private int discountPrice;
	private String discountDetail;
	private int discountDiscountedPirce;
}