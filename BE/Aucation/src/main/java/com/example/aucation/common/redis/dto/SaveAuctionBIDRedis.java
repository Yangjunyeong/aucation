package com.example.aucation.common.redis.dto;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.redis.core.ZSetOperations;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SaveAuctionBIDRedis {

	private String purchaseId;
	private int lowPrice;
	private LocalDateTime bidTime;

	@Builder
	public SaveAuctionBIDRedis(String purchaseId, int lowPrice, LocalDateTime bidTime) {
		this.purchaseId = purchaseId;
		this.lowPrice = lowPrice;
		this.bidTime = bidTime;
	}
}
