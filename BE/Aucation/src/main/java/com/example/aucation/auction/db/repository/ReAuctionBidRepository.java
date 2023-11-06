package com.example.aucation.auction.db.repository;

import com.example.aucation.auction.api.dto.ReAucBidResponse;
import com.example.aucation.auction.api.dto.ReAuctionResponse;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.entity.ReAuctionBid;
import com.example.aucation.common.redis.dto.SaveAuctionBIDRedis;
import com.example.aucation.common.util.DateFormatPattern;
import com.example.aucation.member.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReAuctionBidRepository  extends JpaRepository<ReAuctionBid,Long> {
    Optional<ReAuctionBid> findByAuctionAndMember(Auction auction, Member member);
    List<ReAuctionBid> findByAuction(Auction auction);
}
