package com.example.aucation.auction.db.repository;

import java.util.List;
import java.util.Optional;

import com.example.aucation.auction.api.dto.AuctionListResponse;
import com.example.aucation.auction.api.dto.AuctionSortRequest;
import com.example.aucation.member.db.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.aucation.auction.db.entity.Auction;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepository extends JpaRepository<Auction,Long>, AuctionRepositoryCustom {
	Optional<Auction> findByAuctionUUID(String auctionUUID);

	AuctionListResponse searchPreAucToCondition(Member member, int pageNum,
												AuctionSortRequest sortRequest, Pageable pageable);
	AuctionListResponse searchIngAucByCondition(Member member, int pageNum,
												AuctionSortRequest sortRequest, Pageable pageable);
//	List<Auction> searchReAucByCondition(int pageNum, AuctionSortRequest sortRequest);
}
