package com.example.aucation.auction.api.dto;

import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.reauction.api.dto.ReAucBidResponse;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuctionDetailResponse {

    private Long auctionPk;
    private AuctionStatus auctionStatus; //
    private String auctionTitle;          //
    private String auctionType;          //
    private String auctionOwnerNickname; //
    private String auctionOwnerPhoto;   //
    private List<String> auctionPhoto;
    private double auctionMeetingLat;   //
    private double auctionMeetingLng;    //
    private String auctionInfo;   //
    private Integer auctionStartPrice;    //
    private Long likeCnt;            //
    private Boolean isLike;              //
    private LocalDateTime nowTime;    //
    private LocalDateTime auctionStartTime;
    private LocalDateTime auctionEndTime;
    private int isAction;   // 0 : 전  1 : 중  -1 : 후

    private String auctionUUID;         //
    private Integer auctionCurCnt;
    private Integer auctionTopPrice;  //
    private Integer auctionAskPrice;  //
    /// 경매  ///

    private Boolean isOwner;  //
    private int reAucBidCnt;
    private ReAucBidResponse myReAucBidResponse;            // isOwner : false 인 경우
    private List<ReAucBidResponse> reAucBidResponses = new ArrayList<>();  // true 인 경우

    /// 역경매 ///

    @Builder
    public AuctionDetailResponse(Long auctionPk,String auctionUUID, Integer auctionCurCnt, AuctionStatus auctionStatus,
                                 String auctionTitle, String auctionType, String auctionOwnerNickname,
                                 String auctionOwnerPhoto, List<String> auctionPhoto, double auctionMeetingLat,
                                 double auctionMeetingLng, int auctionStartPrice, int auctionTopPrice,
                                 int auctionAskPrice, String auctionInfo, Long likeCnt, Boolean isLike,
                                 LocalDateTime nowTime, LocalDateTime auctionStartTime,
                                 LocalDateTime auctionEndTime, int isAction) {
        this.auctionPk =auctionPk;
        this.auctionUUID = auctionUUID;
        this.auctionCurCnt = auctionCurCnt;
        this.auctionStatus = auctionStatus;
        this.auctionTitle = auctionTitle;
        this.auctionType = auctionType;
        this.auctionOwnerNickname = auctionOwnerNickname;
        this.auctionOwnerPhoto = auctionOwnerPhoto;
        this.auctionPhoto = auctionPhoto;
        this.auctionMeetingLat = auctionMeetingLat;
        this.auctionMeetingLng = auctionMeetingLng;
        this.auctionStartPrice = auctionStartPrice;
        this.auctionTopPrice = auctionTopPrice;
        this.auctionAskPrice = auctionAskPrice;
        this.auctionInfo = auctionInfo;
        this.likeCnt = likeCnt;
        this.isLike = isLike;
        this.nowTime = nowTime;
        this.auctionStartTime = auctionStartTime;
        this.auctionEndTime = auctionEndTime;
        this.isAction = isAction;
    }
}
