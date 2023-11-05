package com.example.aucation.auction.db.repository;

import com.example.aucation.auction.api.dto.AuctionListResponse;
import com.example.aucation.auction.api.dto.AuctionSortRequest;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.member.db.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionRepositoryCustom {
    AuctionListResponse searchPreAucToCondition(Member member, int pageNum,
                                                AuctionSortRequest sortRequest, Pageable pageable);
    AuctionListResponse searchIngAucByCondition(Member member, int pageNum,
                                                AuctionSortRequest sortRequest, Pageable pageable);
//    List<Auction> searchReAucByCondition(Member member, int pageNum, AuctionSortRequest searchCondition);

}
