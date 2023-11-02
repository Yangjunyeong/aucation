package com.example.aucation.auction.api.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class AuctionPreResponse {
    private LocalDateTime nowTime;
    private int currentPage;
    private int totalPage;
    private List<AuctionPreResponseItem> items;

    @Builder
    public AuctionPreResponse(LocalDateTime nowTime, int currentPage, int totalPage, List<AuctionPreResponseItem> items) {
        this.nowTime = nowTime;
        this.currentPage = currentPage;
        this.totalPage = totalPage;
        this.items = items;
    }
}

