package com.example.aucation.member.api.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyLikeResponse {
	private String memberNickname;

	private String memberDetail;

	private String imgURL;

	private int memberPoint;

	private int currentPage;

	private int totalPage;

	private List<MyLikeItemsResponse> mypageItems;

	@Builder
	public MyLikeResponse(String memberNickname, String memberDetail, String imgURL, int memberPoint,
		int currentPage,
		int totalPage, List<MyLikeItemsResponse> mypageItems) {
		this.memberNickname = memberNickname;
		this.memberDetail = memberDetail;
		this.imgURL = imgURL;
		this.memberPoint = memberPoint;
		this.currentPage = currentPage;
		this.totalPage = totalPage;
		this.mypageItems =mypageItems;
	}
}
