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
	private int bidPrice;
	private String bidTime;
	private int askPrice;
	private int headCnt;

	@Builder
	public SaveAuctionBIDRedis(Long purchasePk, int bidPrice, String bidTime,int askPrice,int headCnt) {
		this.purchasePk = purchasePk;
		this.bidPrice = bidPrice;
		this.bidTime = bidTime;
		this.askPrice = askPrice;
		this.headCnt = headCnt;
	}

	@Override
	public int compareTo(SaveAuctionBIDRedis otherBid) {
		// lowPrice를 비교
		int priceComparison = Integer.compare(this.bidPrice, otherBid.bidPrice);

		// lowPrice가 같은 경우에는 bidTime을 비교
		if (priceComparison == 0) {
			return LocalDateTime.parse(this.bidTime).isBefore(LocalDateTime.parse(otherBid.bidTime)) ? 1 : -1;
		}
		// lowPrice가 큰 것을 우선으로 정렬
		return -priceComparison;
	}
}
