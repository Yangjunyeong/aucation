package com.example.aucation.common.redis.dto;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SaveAuctionBIDRedis {

	private String senderId;
	private String price;
	private LocalDateTime bidTime;

	@Builder
	public SaveAuctionBIDRedis(String senderId, String price, LocalDateTime bidTime) {
		this.senderId = senderId;
		this.price = price;
		this.bidTime = bidTime;
	}
}
