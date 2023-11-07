package com.example.aucation_chat.reauction.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.aucation_chat.auction.db.entity.Auction;
import com.example.aucation_chat.member.db.entity.Member;
import com.example.aucation_chat.reauction.db.entity.ReAuctionBid;

@Repository
public interface ReAuctionBidRepository  extends JpaRepository<ReAuctionBid,Long> {

    Optional<ReAuctionBid> findById(ReAuctionBid reAuctionBid);
    ReAuctionBid findByIdAndMemberId(Long reAucBidPk, Long memberPk);
    boolean existsAuctionHistoryByAuctionAndMember(Auction auction, Member member);
}
