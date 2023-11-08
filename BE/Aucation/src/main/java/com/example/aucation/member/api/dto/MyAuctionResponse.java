package com.example.aucation.member.api.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MyAuctionResponse {

	private String memberNickname;

	private String memberDetail;

	private String imgURL;

	private int memberPoint;

	private int currentPage;

	private int totalPage;

	private List<MypageItemsResponse> MypageItems;

	@Builder
	public MyAuctionResponse(String memberNickname, String memberDetail, String imgURL, int currentPage, int totalPage,
		int memberPoint, List<MypageItemsResponse> mypageItems) {
		this.memberNickname = memberNickname;
		this.memberDetail = memberDetail;
		this.imgURL = imgURL;
		this.currentPage = currentPage;
		this.totalPage = totalPage;
		this.memberPoint = memberPoint;
		MypageItems = mypageItems;
	}
}

