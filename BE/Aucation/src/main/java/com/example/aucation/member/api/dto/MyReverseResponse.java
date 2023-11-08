package com.example.aucation.member.api.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MyReverseResponse {
	private String memberNickname;

	private String memberDetail;

	private String imgURL;

	private int memberPoint;

	private int currentPage;

	private int totalPage;

	private List<MyReverseItemsResponse> MypageItems;

	@Builder
	public MyReverseResponse(String memberNickname, String memberDetail, String imgURL, int memberPoint,
		int currentPage,
		int totalPage, List<MyReverseItemsResponse> mypageItems) {
		this.memberNickname = memberNickname;
		this.memberDetail = memberDetail;
		this.imgURL = imgURL;
		this.memberPoint = memberPoint;
		this.currentPage = currentPage;
		this.totalPage = totalPage;
		MypageItems = mypageItems;
	}
}
