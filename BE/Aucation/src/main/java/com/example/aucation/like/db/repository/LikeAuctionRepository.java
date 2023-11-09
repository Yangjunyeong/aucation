package com.example.aucation.like.db.repository;

import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.like.db.entity.LikeAuction;
import com.example.aucation.member.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeAuctionRepository extends JpaRepository<LikeAuction,Long> {
    Optional<LikeAuction> findByAuctionAndMember(Auction auction, Member member);

	List<LikeAuction> findByAuctionId(Long id);

}
