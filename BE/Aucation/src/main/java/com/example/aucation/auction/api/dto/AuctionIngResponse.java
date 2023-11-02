package com.example.aucation.auction.api.dto;

import java.time.LocalDateTime;

public class AuctionIngResponse {

    private boolean isLike;
    private int likeCnt;
    private String auctionTitle;
    private int auctionStartPrice;
    private int auctionTopBidPrice;
    private int auctionCurCnt;
    private String auctionOwnerNickname;
    private LocalDateTime nowTime;
    private LocalDateTime auctionEndTime;

}
