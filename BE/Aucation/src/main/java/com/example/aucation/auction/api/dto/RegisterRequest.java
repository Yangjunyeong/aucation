package com.example.aucation.auction.api.dto;

import java.time.LocalDateTime;

import com.example.aucation.auction.db.entity.AuctionStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
	private long auctionCumtomerPk;
	private String auctionStatus;
	private String auctionTitle;
	private String auctionObjectName;
	private String auctionType;
	private int auctionStartPrice;
	private int auctionEndPrice;
	private double auctioMeetingLat;
	private double auctionMeetingLng;
	private String auctionDetail;
	private String auctionStartDate;
}
