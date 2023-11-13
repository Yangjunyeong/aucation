package com.example.aucation.member.api.dto;

import java.util.List;

import com.example.aucation.member.db.entity.Role;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyLikeResponse {
	private String memberNickname;

	private Role memberRole;

	private String memberDetail;

	private String imgURL;

	private int memberPoint;

	private int currentPage;

	private int totalPage;

	private List<MyLikeItemsResponse> mypageItems;

	@Builder
	public MyLikeResponse(String memberNickname, Role memberRole, String memberDetail, String imgURL, int memberPoint,
		int currentPage, int totalPage, List<MyLikeItemsResponse> mypageItems) {
		this.memberNickname = memberNickname;
		this.memberRole = memberRole;
		this.memberDetail = memberDetail;
		this.imgURL = imgURL;
		this.memberPoint = memberPoint;
		this.currentPage = currentPage;
		this.totalPage = totalPage;
		this.mypageItems = mypageItems;
	}
}
