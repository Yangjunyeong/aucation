package com.example.aucation.auction.db.repository;

import java.util.List;
import java.util.Optional;

import com.example.aucation.auction.api.dto.*;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.reauction.api.dto.ReAuctionDetailResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.aucation.auction.db.entity.Auction;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepository extends JpaRepository<Auction,Long>, AuctionRepositoryCustom {
	Optional<Auction> findByAuctionUUID(String auctionUUID);
	AuctionListResponse searchPreAucToCondition(Member member, int pageNum,
												AuctionSortRequest sortRequest, Pageable pageable);
	AuctionListResponse searchIngAucToCondition(Member memberPk, int pageNum,
												AuctionSortRequest sortRequest, Pageable pageable);
	AuctionListResponse searchReAucToCondition(Member member, int pageNum,
											   AuctionSortRequest searchCondition, Pageable pageable);
	AuctionDetailResponse searchDetailAuc(Auction auction, Long memberPk,int auctionCondition);

	List<AuctionDetailItem> searchDetailItems(Long memberPk,Auction auction);

	ReAuctionDetailResponse searchDetailReAuc(Auction auction, Long memberPk, int checkTime);
	List<AuctionIngResponseItem> searchHotAuctionToMainPage(Long memberPk);
	List<ReAuctionResponseItem> searchRecentReAucToMainPage(Long memberPk);

}
