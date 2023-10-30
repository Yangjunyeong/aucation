package com.example.aucation.auction.api.service;

import org.springframework.stereotype.Service;

import com.example.aucation.auction.api.dto.PlaceResponse;
import com.example.aucation.auction.api.dto.RegisterRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuctionService {
	public void register(Long memberPk, RegisterRequest registerRequest) {
	}

	public PlaceResponse place(Long memberPk, Long auctionPk) {
		return null;
	}
}
