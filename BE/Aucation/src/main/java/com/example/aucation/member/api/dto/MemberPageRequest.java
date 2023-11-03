package com.example.aucation.member.api.dto;

import org.springframework.stereotype.Service;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberPageRequest {

	private String productType;

	private String productStatus;

	private String auctionStatus;

	private String productFilter;

	//받아야하는 값

	// 경매 종류 => 경매, 역경매, 할인, 좋아요

	// 경매 상품 상태 => 판매, 구매

	// 경매 상태 => 경매 판매 : 전체 경매전 경매중 경매완료
	// 시간을 비교해서 현재 경매전인가 경매중인가 경매완료인가 파악

	// 경매 상태 => 경매 구매 : 전체 낙찰 경매완료
	// 시간을 비교해서 내가 낙찰이된상태인가? 혹은 경매 완료가 된상태인가

	// 경매 상태 => 역경매 판매 : 전체 입찰중 낙찰 거래완료
	// 경매 상태 => 역경매 구매 : 전체 경매중 입찰완료 경매종료

	// 경매 상태 => 할인 판매 : 전체 예약중 판매완료
	// 경매 상태 => 할인 구매 : 전체 예약중 구매완료

	// 경매 상태 => 좋아요 판매 : 전체 경매전 경매중 경매완료

	// 경매 필터 => 최신순 인기순 저가순 고가순

	// 무엇을 고민해야하는가?
	// 시간을 비교해서 현재

}
