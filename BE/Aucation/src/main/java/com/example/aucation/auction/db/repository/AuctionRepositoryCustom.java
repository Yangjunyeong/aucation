package com.example.aucation.auction.db.repository;

import com.example.aucation.auction.api.dto.AuctionPreResponse;
import com.example.aucation.auction.api.dto.AuctionSortRequest;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.member.db.entity.Member;
import com.querydsl.core.Tuple;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionRepositoryCustom {
    AuctionPreResponse searchPreAucToCondition(Member member, int pageNum, AuctionSortRequest searchCondition);
//    List<Auction> searchIngAucByCondition(Member member, int pageNum, AuctionSortRequest searchCondition);
//    List<Auction> searchReAucByCondition(Member member, int pageNum, AuctionSortRequest searchCondition);

}
