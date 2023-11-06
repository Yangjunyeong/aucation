package com.example.aucation.reauction.db.repository;

import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.reauction.db.entity.ReAucBidPhoto;
import com.example.aucation.reauction.db.entity.ReAuctionBid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReAucBidPhotoRepository extends JpaRepository<ReAucBidPhoto,Long> {
    List<ReAucBidPhoto> findByReAuctionBid(ReAuctionBid reAuctionBid);
}
