package com.example.aucation.member.api.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MypageResponse {

	private String memberNickname;

	private String memberDetail;

	private String imgURL;

	private int memberPoint;

	private int currentPage;

	private int totalPage;

	private List<MypageItemsResponse> mypageItems;

	@Builder
	public MypageResponse(String memberNickname, String memberDetail, String imgURL, int memberPoint,
		int currentPage,
		int totalPage, List<MypageItemsResponse> mypageItems) {
		this.memberNickname = memberNickname;
		this.memberDetail = memberDetail;
		this.imgURL = imgURL;
		this.memberPoint = memberPoint;
		this.currentPage = currentPage;
		this.totalPage = totalPage;
		this.mypageItems = mypageItems;
	}
}
