package com.example.aucation.discount.api.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DiscountResponse {

	private String message;
	private String discountUUID;
	private Long prodPk;
}
