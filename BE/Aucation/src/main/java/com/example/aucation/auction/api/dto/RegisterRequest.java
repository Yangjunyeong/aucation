package com.example.aucation.auction.api.dto;

import java.time.LocalDateTime;

import com.example.aucation.auction.db.entity.AuctionStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
	private String auctionStatus;
	private String auctionTitle;
	private String auctionType;
	private int auctionStartPrice;
	private double auctionMeetingLat;
	private double auctionMeetingLng;
	private String auctionDetail;
	private long auctionStartAfterTime;
}
