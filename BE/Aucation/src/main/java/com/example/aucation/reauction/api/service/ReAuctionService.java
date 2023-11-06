package com.example.aucation.reauction.api.service;


import com.example.aucation.auction.api.service.AuctionService;
import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.auction.db.repository.AuctionRepository;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.repository.MemberRepository;
import com.example.aucation.reauction.api.dto.ReAuctionBidRequest;
import com.example.aucation.reauction.db.entity.ReAuctionBid;
import com.example.aucation.reauction.db.repository.ReAucBidPhotoRepository;
import com.example.aucation.reauction.db.repository.ReAuctionBidRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReAuctionService {
    private final AuctionRepository auctionRepository;
    private final MemberRepository memberRepository;
    private final ReAuctionBidRepository reAuctionBidRepository;
    private final ReAucBidPhotoService reAucBidPhotoService;

    @Transactional
    public void bidReAuction(Long memberPk, ReAuctionBidRequest reAuctionBidRequest,
                             List<MultipartFile> multipartFiles) throws Exception{
        log.info("********************** bidReAuction start");
        Auction auction = auctionRepository.findById(reAuctionBidRequest.getReAuctionPk())
                .orElseThrow(()-> new NotFoundException(ApplicationError.NOT_EXIST_AUCTION));
        Member member = memberRepository.findById(memberPk)
                .orElseThrow(()->new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));

        log.info("********************** 역경매 여부 확인 시도");
        if(!auction.getAuctionStatus().equals(AuctionStatus.REVERSE_BID)){
            log.info("********************** 역경매가 아닙니다.");
            throw new Exception("역경매가 아닙니다.");
        }
        log.info("********************** 역경매 여부 확인 완료");

        log.info("********************** 역경매 입찰 내역 저장 시도");
        ReAuctionBid reAuctionBid = ReAuctionBid.builder()
                .reAucBidPrice(reAuctionBidRequest.getReAuctionBidPrice())
                .reAucBidDetail(reAuctionBidRequest.getReAuctionInfo())
                .reAucBidDatetime(LocalDateTime.now())
                .member(member)
                .auction(auction)
                .build();
        reAuctionBid = reAuctionBidRepository.save(reAuctionBid);
        log.info("********************** 역경매 입찰 내역 저장 성공");
        
        log.info("********************** 역경매 입찰 사진 저장 시도");
        reAucBidPhotoService.upload(multipartFiles,reAuctionBid.getId());
        log.info("********************** 역경매 입찰 사진 저장 성공, 사진 수 = {}", multipartFiles.size());
        log.info("********************** bidReAuction end");
    }
}
