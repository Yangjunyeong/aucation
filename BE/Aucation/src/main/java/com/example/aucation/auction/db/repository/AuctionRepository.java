package com.example.aucation.auction.db.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.aucation.auction.db.entity.Auction;

@Repository
public interface AuctionRepository extends JpaRepository<Auction,Long> {

	Optional<Auction> findByAuctionUUID(String auctionUUID);
}
