package com.example.aucation.member.api.dto;

import java.time.LocalDateTime;

import com.example.aucation.auction.db.entity.AuctionStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MypageLikeResponse {

	private AuctionStatus auctionStatus;
	private String auctionTitle;
	private int auctionPrice;
	private LocalDateTime auctionStartTime;

}
