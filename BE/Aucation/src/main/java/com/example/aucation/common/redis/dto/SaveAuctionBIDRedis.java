package com.example.aucation.common.redis.dto;

import java.io.Serializable;
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
public class SaveAuctionBIDRedis implements Comparable<SaveAuctionBIDRedis>,Serializable{

	private Long purchasePk;
	private int lowPrice;
	private String bidTime;

	@Builder
	public SaveAuctionBIDRedis(Long purchasePk, int lowPrice, String bidTime) {
		this.purchasePk = purchasePk;
		this.lowPrice = lowPrice;
		this.bidTime = bidTime;
	}

	@Override
	public int compareTo(SaveAuctionBIDRedis otherBid) {
		// lowPrice를 비교
		int priceComparison = Integer.compare(this.lowPrice, otherBid.lowPrice);

		// lowPrice가 같은 경우에는 bidTime을 비교
		if (priceComparison == 0) {
			return this.bidTime.compareTo(otherBid.bidTime);
		}
		// lowPrice가 큰 것을 우선으로 정렬
		return -priceComparison;
	}
}
