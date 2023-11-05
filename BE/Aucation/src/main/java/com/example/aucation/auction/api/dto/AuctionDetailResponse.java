package com.example.aucation.auction.api.dto;

import com.example.aucation.auction.db.entity.AuctionStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuctionDetailResponse {

    private String auctionUUID;         //

    private Integer auctionCurCnt;
    private AuctionStatus auctionStatus; //
    private String auctionTitle;          //
    private String auctionType;          //
    private String auctionOwnerNickname; //
    private String auctionOwnerPhoto;   //
    private List<String> auctionPhoto;

    private double auctionMeetingLat;   //
    private double auctionMeetingLng;    //

    private Integer auctionStartPrice;    //
    private Integer auctionTopPrice;  //
    private Integer auctionAskPrice;  //
    private String auctionInfo;   //

    private Long likeCnt;            //
    private Boolean isLike;              //

    private LocalDateTime nowTime;    //

    private LocalDateTime auctionStartTime;
    private LocalDateTime auctionEndTime;
    private LocalDateTime auctionTime;

    private int isAction;
    @Builder
    public AuctionDetailResponse(String auctionUUID, Integer auctionCurCnt, AuctionStatus auctionStatus, String auctionTitle, String auctionType, String auctionOwnerNickname, String auctionOwnerPhoto, List<String> auctionPhoto, double auctionMeetingLat, double auctionMeetingLng, int auctionStartPrice, int auctionTopPrice, int auctionAskPrice, String auctionInfo, Long likeCnt, Boolean isLike, LocalDateTime nowTime, LocalDateTime auctionStartTime, LocalDateTime auctionEndTime, LocalDateTime auctionTime, int isAction) {
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
        this.auctionTime = auctionTime;
        this.isAction = isAction;
    }
}
