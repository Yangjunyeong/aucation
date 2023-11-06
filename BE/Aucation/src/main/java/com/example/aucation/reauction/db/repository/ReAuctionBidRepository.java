package com.example.aucation.reauction.db.repository;

import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.reauction.db.entity.ReAuctionBid;
import com.example.aucation.member.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReAuctionBidRepository  extends JpaRepository<ReAuctionBid,Long> {

    Optional<ReAuctionBid> findById(Long reAucBidPk);
    ReAuctionBid findByIdAndMemberId(Long reAucBidPk, Long memberPk);

}
