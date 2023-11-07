package com.example.aucation.reauction.api.service;


import com.example.aucation.auction.db.entity.Auction;
import com.example.aucation.auction.db.entity.AuctionHistory;
import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.auction.db.repository.AuctionHistoryRepository;
import com.example.aucation.auction.db.repository.AuctionRepository;
import com.example.aucation.common.entity.HistoryStatus;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.ApplicationException;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.repository.MemberRepository;
import com.example.aucation.reauction.api.dto.OwnReAucBidResponse;
import com.example.aucation.reauction.api.dto.ReAuctionBidRequest;
import com.example.aucation.reauction.api.dto.ReAuctionSelectRequest;
import com.example.aucation.reauction.api.dto.ReAuctionSelectResponse;
import com.example.aucation.reauction.db.entity.ReAuctionBid;
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
    private final AuctionHistoryRepository auctionHistoryRepository;
    @Transactional
    public OwnReAucBidResponse bidReAuction(Long memberPk, ReAuctionBidRequest reAuctionBidRequest,
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

        log.info("********************** 선택된 입찰 내역이 존재 여부 확인 시도");
        if(auctionHistoryRepository.existsAuctionHistoryByAuction(auction)){
            throw new ApplicationException(ApplicationError.EXIST_BID_HISTORY);
        }
        log.info("********************** 선택된 입찰 내역 존재 여부 확인 완료");

        log.info("********************** 자신의 입찰 내역 존재 여부 확인 시도");
        if(reAuctionBidRepository.existsAuctionHistoryByAuctionAndMember(auction,member)){
            throw new ApplicationException(ApplicationError.EXIST_OWN_BID);
        }
        log.info("********************** 자신의 입찰 내역 존재 여부 확인 완료");

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
        return OwnReAucBidResponse.builder()
                .reAuctionPk(auction.getId())
                .reAuctionTitle(auction.getAuctionTitle())
                .reAuctionOwnerNickname(auction.getOwner().getMemberNickname())
                .build();
    }

    @Transactional
    public ReAuctionSelectResponse selectBid(Long memberPk, ReAuctionSelectRequest request){
        log.info("********************** selectBid start");
        Auction auction = auctionRepository.findById(request.getReAuctionPk())
                .orElseThrow(()-> new NotFoundException(ApplicationError.NOT_EXIST_AUCTION));
        Member member = memberRepository.findById(memberPk)
                .orElseThrow(()->new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));

        log.info("********************** 입찰 가능 여부 확인 시도");
        if(auctionHistoryRepository.existsAuctionHistoryByAuction(auction)){
            throw new ApplicationException(ApplicationError.EXIST_BID_HISTORY);
        }
        log.info("********************** 입찰 가능 여부 확인 완료");

        log.info("********************** 입찰 가능 인원 확인 시도");
        if(auction.getOwner().equals(member)){
            throw new ApplicationException(ApplicationError.OWNER_NOT_BID);
        }
        log.info("********************** 입찰 가능 인원 확인 완료");

        log.info("********************** 입찰 내역 확인 시도");
        ReAuctionBid reAuctionBid = reAuctionBidRepository.findById(request.getReAuctionBidPk())
                        .orElseThrow(()->new ApplicationException(ApplicationError.NOT_EXIST_BID));
        log.info("********************** 입찰 내역 확인 완료");

        log.info("********************** 입찰 가능 포인트 확인 및 설정 시도");
        if(member.getMemberPoint() < reAuctionBid.getReAucBidPrice()){
            throw new ApplicationException(ApplicationError.MEMBER_NOT_HAVE_MONEY);
        }
        member.updatePoint(member.getMemberPoint() - reAuctionBid.getReAucBidPrice());
        log.info("********************** 입찰 가능 포인트 확인 및 설정 완료");

        log.info("********************** 경매 상태 변경 시도");
        auction.updateReAuctionToEnd(member,reAuctionBid.getReAucBidPrice());
        log.info("********************** 경매 상태 변경 완료");

        log.info("********************** 경매 내역 저장 시도");
        AuctionHistory auctionHistory = AuctionHistory.builder()
                .customer(member)
                .owner(auction.getOwner())
                .historyDateTime(LocalDateTime.now())
                .auction(auction)
                .historyStatus(HistoryStatus.BEFORE_CONFIRM)
                .build();
        auctionHistoryRepository.save(auctionHistory);
        log.info("********************** 경매 내역 저장 완료");

        log.info("********************** selectBid end");
        return ReAuctionSelectResponse.builder()
                .reAuctionPk(auction.getId())
                .reAuctionSelectBidPrice(auction.getAuctionEndPrice())
                .reAuctionBidOwnerNickname(auction.getOwner().getMemberNickname())
                .build();
    }
}
