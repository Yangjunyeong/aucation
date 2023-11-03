package com.example.aucation.auction.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AuctionIngResponseItem {
    private Boolean isLike;    //
    private long likeCnt;  //
    private long auctionPk;   //
    private String auctionUUID;   //
    private String auctionTitle;  //
    private Integer auctionStartPrice;  //
    private Integer auctionTopBidPrice;
    private Integer auctionCurCnt;
    private String auctionOwnerNickname; //
    private LocalDateTime auctionEndTime; //
    private String auctionImg;//
}