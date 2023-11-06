package com.example.aucation.discount.api.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.aucation.auction.api.dto.RegisterRequest;
import com.example.aucation.common.support.AuthorizedVariable;
import com.example.aucation.discount.api.dto.DiscountRequest;
import com.example.aucation.discount.api.service.DiscountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/discount")
public class DiscountController {

	private final DiscountService discountService;

	@PostMapping("/register")
	private ResponseEntity<Void> register(@AuthorizedVariable Long memberPk,
DiscountRequest discountRequest, List<MultipartFile> multipartFiles) throws
		IOException {
		discountService.register(memberPk,discountRequest,multipartFiles);
		return ResponseEntity.ok().build();
	}

}
