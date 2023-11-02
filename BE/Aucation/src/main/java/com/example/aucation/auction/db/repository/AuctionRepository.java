package com.example.aucation.auction.db.repository;

import java.util.List;
import java.util.Optional;

import com.example.aucation.auction.api.dto.AuctionPreResponse;
import com.example.aucation.auction.api.dto.AuctionSortRequest;
import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.member.db.entity.Member;
import com.querydsl.core.Tuple;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.aucation.auction.db.entity.Auction;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepository extends JpaRepository<Auction,Long>, AuctionRepositoryCustom {
	Optional<Auction> findByAuctionUUID(String auctionUUID);

	AuctionPreResponse searchPreAucToCondition(Member member, int pageNum, AuctionSortRequest sortRequest);
//	List<Auction> searchIngAucByCondition(int pageNum, AuctionSortRequest sortRequest,boolean isStart);
//	List<Auction> searchReAucByCondition(int pageNum, AuctionSortRequest sortRequest);
}
