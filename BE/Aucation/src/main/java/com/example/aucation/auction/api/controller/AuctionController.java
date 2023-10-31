package com.example.aucation.auction.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.aucation.auction.api.dto.PlaceResponse;
import com.example.aucation.auction.api.dto.RegisterRequest;
import com.example.aucation.auction.api.dto.RegisterResponse;
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
	private ResponseEntity<Void> register(@AuthorizedVariable Long memberPk, @RequestBody RegisterRequest registerRequest){
		auctionService.register(memberPk,registerRequest);
		return ResponseEntity.ok().build();
	}
}
