package com.example.aucation.auction.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
public class AuctionListResponse {
    private LocalDateTime nowTime;
    private int currentPage;
    private Long totalPage;
    private List<AuctionPreResponseItem> preItems;
    private List<AuctionIngResponseItem> ingItems;
//    private List<ReAuctionResponseItem> reItems;

    @Builder

    public AuctionListResponse(LocalDateTime nowTime, int currentPage, double totalPage, List<AuctionPreResponseItem> preItems, List<AuctionIngResponseItem> ingItems) {
        this.nowTime = nowTime;
        this.currentPage = currentPage;
        this.totalPage = (long)totalPage;
        this.preItems = preItems;
        this.ingItems = ingItems;
    }
}

