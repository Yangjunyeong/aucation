package com.example.aucation.auction.db.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
@Getter
@RequiredArgsConstructor
public enum AuctionStatus {
	BID("경매"),
	REVERSE_BID("역경매"),
	SHOP_DISCOUNT("상점할인");

	private final String key;


}