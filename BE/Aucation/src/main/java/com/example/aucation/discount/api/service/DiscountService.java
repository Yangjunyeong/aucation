package com.example.aucation.discount.api.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.aucation.auction.api.dto.RegisterRequest;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.common.util.PasswordGenerator;
import com.example.aucation.discount.api.dto.DiscountRequest;
import com.example.aucation.discount.db.entity.Discount;
import com.example.aucation.discount.db.repository.DiscountRepository;
import com.example.aucation.disphoto.api.service.DisPhotoService;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.repository.MemberRepository;
import com.example.aucation.photo.api.service.PhotoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DiscountService {

	private final MemberRepository memberRepository;

	private final DiscountRepository discountRepository;

	private final DisPhotoService disPhotoService;
	@Transactional
	public void register(Long memberPk, DiscountRequest discountRequest, List<MultipartFile> multipartFiles) throws
		IOException {

		Member member = memberRepository.findById(memberPk)
			.orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		String discountUUID = PasswordGenerator.generate();

		Discount discount = Discount.builder()
			.discountCategory(discountRequest.getDiscountCategory())
			.discountDetail(discountRequest.getDiscountDetail())
			.discountDiscountedPirce(discountRequest.getDiscountDiscountedPirce())
			.discountStart(LocalDateTime.now())
			.discountEnd(LocalDateTime.now().plusMinutes(discountRequest.getDiscountEnd()))
			.discountTitle(discountRequest.getDiscountTitle())
			.discountPrice(discountRequest.getDiscountPrice())
			.discountDiscountedPirce(discountRequest.getDiscountDiscountedPirce())
			.discountUUID(discountUUID)
			.owner(member)
			.build();
		discountRepository.save(discount);
		disPhotoService.uploadDiscount(multipartFiles, discountUUID);
		// String key = "dis-pre:" + discountUUID;
		// stringRedisTemplate.opsForValue().set(key, "This is a token for Prepared_Auction");
		// stringRedisTemplate.expire(key, registerRequest.getAuctionStartAfterTime(), TimeUnit.MINUTES);
	}
}
