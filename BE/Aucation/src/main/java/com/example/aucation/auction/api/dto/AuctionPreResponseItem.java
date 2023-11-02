package com.example.aucation.auction.api.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AuctionPreResponseItem{
    private boolean isLike; //
    private long likeCnt;   //
    private String auctionTitle; //
    private int auctionStartPrice; //
    private boolean auctionOwnerIsShop;
    private String auctionOwnerNickname; //
    private LocalDateTime auctionStartTime;  //
    private List<String> auctionImg;  //
}