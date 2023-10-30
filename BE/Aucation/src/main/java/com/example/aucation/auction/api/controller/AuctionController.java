package com.example.aucation.auction.api.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

	// @GetMapping("/place/{auctionPk}")
	// private ResponseEntity<RegisterResponse> place(@AuthorizedVariable Long memberPk, @PathVariable("auctionPk")Long auctionPk){
	// 	return ResponseEntity.ok().body(auctionService.place(memberPk,auctionPk));
	//
	// }

}
