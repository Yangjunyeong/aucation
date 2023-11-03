package com.example.aucation.auction.api.controller;

import com.example.aucation.auction.api.dto.AuctionSortRequest;
import java.io.IOException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.aucation.auction.api.dto.PlaceResponse;
import com.example.aucation.auction.api.dto.RegisterRequest;
import com.example.aucation.auction.api.service.AuctionService;
import com.example.aucation.common.support.AuthorizedVariable;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/auction")
@RequiredArgsConstructor
@Slf4j
public class AuctionController {

	private final AuctionService auctionService;

	@GetMapping("/place/{auctionUUID}")
	private ResponseEntity<PlaceResponse> place(@AuthorizedVariable Long memberPk,
		@PathVariable("auctionUUID") String auctionUUID) throws Exception {
		return ResponseEntity.ok().body(auctionService.place(memberPk, auctionUUID));
	}

	@PostMapping("/register")
	private ResponseEntity<Void> register(@AuthorizedVariable Long memberPk,RegisterRequest registerRequest, @RequestPart(value="multipartFiles")
	List<MultipartFile> multipartFiles) throws
		IOException {
		auctionService.register(memberPk,registerRequest,multipartFiles);
		return ResponseEntity.ok().build();
	}
	@PostMapping("/list/pre/{pageNum}")
	private ResponseEntity<?> getAucPreList(@AuthorizedVariable Long memberPk, @PathVariable int pageNum, @RequestBody(required = false) AuctionSortRequest sortRequest){
		return ResponseEntity.ok().body(auctionService.getAuctionPreList(memberPk,pageNum,sortRequest));
	}

	@PostMapping("/list/ing/{pageNum}")
	private ResponseEntity<?> getAucIngList(@AuthorizedVariable Long memberPk, @PathVariable int pageNum, @RequestBody AuctionSortRequest sortRequest){
		return ResponseEntity.ok().body(auctionService.getAuctionIngList(memberPk,pageNum,sortRequest));
	}

	// 추후 추가 개발
//	@PostMapping("/list/reAuc/{pageNum}")
//	private ResponseEntity<?> getReAucList(@AuthorizedVariable Long memberPk, @PathVariable int pageNum, @RequestBody AuctionSortRequest sortRequest){
//		return ResponseEntity.ok().body(auctionService.getReAuctionList(memberPk,pageNum,sortRequest));
//	}
}
