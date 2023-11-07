package com.example.aucation.discount.api.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.example.aucation.discount.db.entity.Discount;
import com.example.aucation.member.db.entity.Member;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EnterResponse {

	private String discountTitle;
	private String discountCategory;
	private LocalDateTime discountEnd;
	private int discountPrice;
	private String discountDetail;
	private int discountDiscountedPrice;
	private List<String> discountImgURL;
	private String discountUUID;
	private String ownerName;
	private long ownerPk;
	private int memberPoint;
	private long memberPk;
	private String myNickname;

	public static EnterResponse of(List<String> uuidImage, Discount discount, Member member) {
		return EnterResponse.builder()
			.discountImgURL(uuidImage)
			.discountCategory(discount.getDiscountCategory())
			.discountDetail(discount.getDiscountDetail())
			.discountDiscountedPrice(discount.getDiscountDiscountedPrice())
			.discountEnd(discount.getDiscountEnd())
			.discountPrice(discount.getDiscountPrice())
			.discountTitle(discount.getDiscountTitle())
			.discountUUID(discount.getDiscountUUID())
			.ownerPk(discount.getOwner().getId())
			.ownerName(discount.getOwner().getMemberNickname())
			.memberPoint(member.getMemberPoint())
			.memberPk(member.getId())
			.myNickname(member.getMemberNickname())
			.build();
	}
}
