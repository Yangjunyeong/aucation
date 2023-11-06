package com.example.aucation.member.api.dto;

import java.time.LocalDateTime;

import com.example.aucation.auction.db.entity.AuctionStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MypageItemsResponse {

	//경매 이름
	private String auctionTitle;

	//경매 종료일시
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime auctionEndDate;

	//옥션 UUID
	private Long auctionPk;

	//옥션 UUID
	private String auctionUUID;

	//경매 최종낙찰가
	private int auctionSuccessPay;
	//시작가
	private int auctionStarePrice;
	// 판매
	private Long ownerPk;
	//경매 - 판매
	private LocalDateTime registerDate;

	private LocalDateTime auctionStartDate;

	private AuctionStatus auctionStatus;

	private String auctionType;


}
