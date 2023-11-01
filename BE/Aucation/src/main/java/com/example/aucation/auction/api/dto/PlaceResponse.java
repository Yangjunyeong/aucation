package com.example.aucation.auction.api.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceResponse {

	private long memberPk;
	private int memberPoint;
	private String title;
	private String detail;
	private String ownerNickname;
	private List<String> ownerPicture;
	private long ownerPk;
	private String ownerType;
	private int nowPrice;
	private int askPrice;
	private LocalDateTime enterTime;
	private LocalDateTime endTime;
	private int headCnt;
	private boolean isBid;

	@Builder
	public PlaceResponse(long memberPk, int memberPoint, String title, String detail, String ownerNickname,
		List<String> ownerPicture, long ownerPk, String ownerType, int nowPrice, int askPrice, LocalDateTime enterTime,
		LocalDateTime endTime, int headCnt, boolean isBid) {
		this.memberPk = memberPk;
		this.memberPoint = memberPoint;
		this.title = title;
		this.detail = detail;
		this.ownerNickname = ownerNickname;
		this.ownerPicture = ownerPicture;
		this.ownerPk = ownerPk;
		this.ownerType = ownerType;
		this.nowPrice = nowPrice;
		this.askPrice = askPrice;
		this.enterTime = enterTime;
		this.endTime = endTime;
		this.headCnt = headCnt;
		this.isBid = isBid;
	}
}
