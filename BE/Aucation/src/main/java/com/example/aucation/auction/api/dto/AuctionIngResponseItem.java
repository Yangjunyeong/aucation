package com.example.aucation.auction.api.dto;

import com.example.aucation.member.db.entity.Role;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AuctionIngResponseItem {
    private Boolean isLike;    //
    private Long likeCnt;  //
    private long auctionPk;   //
    private String auctionUUID;   //
    private String auctionTitle;  //
    private Integer auctionStartPrice;  //
    private Integer auctionTopBidPrice;
    private Integer auctionCurCnt;
    private Boolean auctionOwnerIsShop; //
    private String auctionOwnerNickname; //
    private LocalDateTime auctionEndTime; //
    private String auctionImg;//
}