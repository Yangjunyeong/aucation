package com.example.aucation.reauction.api.controller;


import com.example.aucation.auction.api.dto.RegisterRequest;
import com.example.aucation.common.support.AuthorizedVariable;
import com.example.aucation.reauction.api.dto.ReAuctionBidRequest;
import com.example.aucation.reauction.api.service.ReAuctionService;
import com.example.aucation.reauction.db.entity.ReAuctionBid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/reauction")
@RequiredArgsConstructor
@Slf4j
public class ReAuctionController {
    private final ReAuctionService reAuctionService;
    @PostMapping("/bid")
    private ResponseEntity<Void> bid(@AuthorizedVariable Long memberPk,
                                     ReAuctionBidRequest reAuctionBidRequest, @RequestPart(value="multipartFiles")
    List<MultipartFile> multipartFiles) throws
            IOException, Exception {

        reAuctionService.bidReAuction(memberPk,reAuctionBidRequest,multipartFiles);
        return ResponseEntity.ok().build();
    }
}
