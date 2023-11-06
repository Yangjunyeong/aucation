package com.example.aucation.auction.api.dto;

import com.example.aucation.auction.db.entity.AuctionStatus;
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
public class ReAucBidResponse {
    private Long customerPk;
    private String customerNickName;
    private String customerPhoto;
    private String bidDetail;
    private Integer bidPrice;
    List<String> bidPhotos = new ArrayList<>();

    @Builder
    public ReAucBidResponse(Long customerPk, String customerNickName, String customerPhoto, String bidDetail, Integer bidPrice, List<String> bidPhotos) {
        this.customerPk = customerPk;
        this.customerNickName = customerNickName;
        this.customerPhoto = customerPhoto;
        this.bidDetail = bidDetail;
        this.bidPrice = bidPrice;
        this.bidPhotos = bidPhotos;
    }
}
