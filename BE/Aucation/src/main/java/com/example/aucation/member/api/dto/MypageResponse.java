package com.example.aucation.member.api.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MypageResponse {

	private int currentPage;

	private int totalPage;

	private List<MypageItemsResponse> MypageItems;

	@Builder
	public MypageResponse(int currentPage, int totalPage, List<MypageItemsResponse> mypageItems) {
		this.currentPage = currentPage;
		this.totalPage = totalPage;
		MypageItems = mypageItems;
	}
}
