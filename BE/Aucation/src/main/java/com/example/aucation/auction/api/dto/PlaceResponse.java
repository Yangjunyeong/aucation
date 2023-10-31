package com.example.aucation.auction.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceResponse {

	private String memberNickname;
	private int memberPoint;
	private String auctionTitle;
	private String auctionObjectName;
	private int auctionStartPrice;
	private int auctionEndPrice;
	private String auctionDetail;
	private double auctionMeetingLat;
	private double auctionMeetingLng;
	private String auctionUUID;

	@Builder
	public PlaceResponse(String memberNickname, int memberPoint, String auctionTitle, String auctionObjectName,
		int auctionStartPrice, int auctionEndPrice, String auctionDetail, double auctionMeetingLat,
		double auctionMeetingLng, String auctionUUID) {
		this.memberNickname = memberNickname;
		this.memberPoint = memberPoint;
		this.auctionTitle = auctionTitle;
		this.auctionObjectName = auctionObjectName;
		this.auctionStartPrice = auctionStartPrice;
		this.auctionEndPrice = auctionEndPrice;
		this.auctionDetail = auctionDetail;
		this.auctionMeetingLat = auctionMeetingLat;
		this.auctionMeetingLng = auctionMeetingLng;
		this.auctionUUID = auctionUUID;
	}
}
