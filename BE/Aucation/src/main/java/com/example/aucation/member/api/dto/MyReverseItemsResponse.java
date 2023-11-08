package com.example.aucation.member.api.dto;

import java.time.LocalDateTime;

import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.common.entity.HistoryStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MyReverseItemsResponse {
	private String auctionTitle;
	private int auctionStarePrice;
	private int auctionSuccessPay;
	private Long ownerPk;
	private Long customerPk;
	private String auctionUUID;
	private Long auctionPk;
	private AuctionStatus auctionStatus;
	private String auctionType;
	private LocalDateTime registerDate;
	private LocalDateTime reAucBidDateTime;
	private int reAucBidPrice;
	private HistoryStatus auctionHistory;
	private LocalDateTime historyDateTime;
	private LocalDateTime historyDoneDateTime;
	private String imgfile;

}
