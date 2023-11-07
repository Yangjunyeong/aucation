package com.example.aucation.discount.api.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DiscountRequest {
	private String discountTitle;
	private String discountType;
	private double discountLng;
	private double discountLat;
	private String discountEnd;
	private int discountPrice;
	private String discountDetail;
	private int discountDiscountedPrice;
}