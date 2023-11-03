package com.example.aucation.auction.api.dto;

import com.example.aucation.photo.db.Photo;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AuctionPreResponseItem{
    private long auctionPk;
    private Boolean isLike; //
    private long likeCnt;   //
    private String auctionTitle; //
    private Integer auctionStartPrice; //
    private boolean auctionOwnerIsShop;
    private String auctionOwnerNickname; //
    private LocalDateTime auctionStartTime;  //
    private String auctionImg;  //
}