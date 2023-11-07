package com.example.aucation.discount.api.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.aucation.common.entity.HistoryStatus;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.BadRequestException;
import com.example.aucation.common.error.ExistsException;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.common.util.PasswordGenerator;
import com.example.aucation.discount.api.dto.DiscountRequest;
import com.example.aucation.discount.api.dto.DiscountResponse;
import com.example.aucation.discount.api.dto.EnterResponse;
import com.example.aucation.discount.api.dto.PurchaseResponse;
import com.example.aucation.discount.db.entity.Discount;
import com.example.aucation.discount.db.entity.DiscountHistory;
import com.example.aucation.discount.db.repository.DiscountHistoryRepository;
import com.example.aucation.discount.db.repository.DiscountRepository;
import com.example.aucation.disphoto.api.service.DisPhotoService;
import com.example.aucation.disphoto.db.entity.DisPhoto;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.entity.Role;
import com.example.aucation.member.db.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DiscountService {

	private final MemberRepository memberRepository;

	private final DiscountRepository discountRepository;

	private final DisPhotoService disPhotoService;

	private final DiscountHistoryRepository discountHistoryRepository;

	private static final String SUCCESS_REGISTER_MESSAGE="할인 상품이 등록되었습니다.";

	private static final String SUCCESS_PURCHASE_MESSAGE="할인 상품을 구매했습니다";
	@Transactional
	public DiscountResponse register(Long memberPk, DiscountRequest discountRequest, List<MultipartFile> multipartFiles) throws
		IOException {

		Member member = memberRepository.findById(memberPk)
			.orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
		String discountUUID = PasswordGenerator.generate();

		isSmallBusiness(member);

		int discountRate = (int)Math.ceil(((double)discountRequest.getDiscountDiscountedPrice() /discountRequest.getDiscountPrice())*100);
		String dateString = discountRequest.getDiscountEnd();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSS");
		LocalDateTime dateTime = LocalDateTime.parse(dateString, formatter);


		Discount discount = Discount.builder()
			.discountType(discountRequest.getDiscountType())
			.discountDetail(discountRequest.getDiscountDetail())
			.discountLng(discountRequest.getDiscountLng())
			.discountLat(discountRequest.getDiscountLat())
			.discountDiscountedPrice(discountRequest.getDiscountDiscountedPrice())
			.discountStart(LocalDateTime.now())
			.discountEnd(dateTime)
			.discountTitle(discountRequest.getDiscountTitle())
			.discountPrice(discountRequest.getDiscountPrice())
			.discountUUID(discountUUID)
			.discountRate(discountRate)
			.owner(member)
			.build();

		discountRepository.save(discount);
		disPhotoService.uploadDiscount(multipartFiles, discountUUID);
		return DiscountResponse.builder().message(SUCCESS_REGISTER_MESSAGE).build();
	}

	@Transactional
	public EnterResponse place(Long memberPk, String discountUUID) {

		Member member = memberRepository.findById(memberPk)
			.orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));

		Discount discount = discountRepository.findByDiscountUUID(discountUUID).orElseThrow(()->new NotFoundException(
			ApplicationError.DISCOUNT_NOT_FOUND));

		List<DisPhoto> disPhotos = disPhotoService.getPhoto(discount.getId());

		List<String> UUIDImage = disPhotos.stream()
								.map(DisPhoto::getImgUrl)
								.collect(Collectors.toList());

		return EnterResponse.of(UUIDImage, discount, member);
	}

	public void isSmallBusiness(Member member){
		if(member.getMemberRole().equals(Role.COMMON)){
			throw new BadRequestException(ApplicationError.NOT_VERIFY_SMALL_BUSINESS);
		}
	}

	@Transactional
	public PurchaseResponse purchase(Long memberPk, String discountUUID) {

		Member member = memberRepository.findById(memberPk)
			.orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));

		Discount discount = discountRepository.findByDiscountUUID(discountUUID).orElseThrow(()->new NotFoundException(
			ApplicationError.DISCOUNT_NOT_FOUND));

		isOwnerPurchase(member,discount);
		isAlreadPurchase(discount);
		isHaveCustomerMoney(member,discount);
		member.minusUpdatePoint(member.getMemberPoint(),discount.getDiscountDiscountedPrice());

		DiscountHistory discountHistory = DiscountHistory.builder()
			.historyDatetime(LocalDateTime.now())
			.customer(member)
			.owner(discount.getOwner())
			.discount(discount)
			.historyStatus(HistoryStatus.BEFORE_CONFIRM)
			.build();
		discountHistoryRepository.save(discountHistory);

		return PurchaseResponse.builder().message(SUCCESS_PURCHASE_MESSAGE).build();
	}

	private void isOwnerPurchase(Member member, Discount discount) {
		if(Objects.equals(member.getId(), discount.getOwner().getId())){
			throw new BadRequestException(ApplicationError.YOU_ARE_OWNER);
		}
	}

	private void isHaveCustomerMoney(Member member, Discount discount) {

		if(member.getMemberPoint()<discount.getDiscountDiscountedPrice()){
			throw new BadRequestException(ApplicationError.MEMBER_NOT_HAVE_MONEY);
		}
	}

	private void isAlreadPurchase(Discount discount) {
		
		if(discountHistoryRepository.existsByDiscountId(discount.getId())){
			throw new ExistsException(ApplicationError.ALREADY_EXISTS_PURCHASE_USER);
		}
	}
}
