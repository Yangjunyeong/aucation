package com.example.aucation.member.api.dto;

import com.example.aucation.auction.api.dto.AuctionIngResponseItem;
import com.example.aucation.auction.api.dto.ReAuctionResponseItem;
import com.example.aucation.discount.api.dto.DiscountListResponseItem;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MainPageResponse {
    List<AuctionIngResponseItem> hotAuctions;
    List<DiscountListResponseItem> discounts;
    List<ReAuctionResponseItem> recentAuctions;
}
