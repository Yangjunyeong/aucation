package com.example.aucation.member.db.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.auction.db.entity.QAuction;
import com.example.aucation.auction.db.entity.QAuctionHistory;
import com.example.aucation.common.entity.HistoryStatus;
import com.example.aucation.discount.db.entity.QDiscount;
import com.example.aucation.discount.db.entity.QDiscountHistory;
import com.example.aucation.member.api.dto.MemberPageRequest;
import com.example.aucation.member.api.dto.MyAuctionResponse;
import com.example.aucation.member.api.dto.MyDiscountItemsResponse;
import com.example.aucation.member.api.dto.MyDiscountResponse;
import com.example.aucation.member.api.dto.MyLikeResponse;
import com.example.aucation.member.api.dto.MyReverseItemsResponse;
import com.example.aucation.member.api.dto.MyReverseResponse;
import com.example.aucation.member.api.dto.MypageItemsResponse;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.entity.QMember;
import com.example.aucation.reauction.db.entity.QReAuctionBid;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Repository
@RequiredArgsConstructor
@Slf4j
public class MemberRepositoryImpl implements MemberRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

	private final QAuction qAuction = QAuction.auction;

	private final QAuctionHistory qAuctionHistory = QAuctionHistory.auctionHistory1;

	private final QReAuctionBid qReAuctionBid = QReAuctionBid.reAuctionBid;

	private final QDiscount qDiscount = QDiscount.discount;

	private final QDiscountHistory qDiscountHistory = QDiscountHistory.discountHistory;

	@Override
	public MyAuctionResponse searchMyAuctionPage(Member member, MemberPageRequest memberPageRequest,
		Pageable pageable) {

		//경매인지 아닌지 필터 ->
		//경매전, 경매중, 경매완료 인지 -> startDate로 판단
		//
		JPAQuery<MypageItemsResponse> query = jpaQueryFactory
			.select(
				Projections.bean(MypageItemsResponse.class,
					qAuction.auctionTitle.as("auctionTitle"),
					qAuction.auctionStartDate.as("auctionStartDate"),
					qAuction.auctionStartPrice.as("auctionStarePrice"),
					qAuction.auctionEndDate.as("auctionEndDate"),
					qAuction.auctionEndPrice.as("auctionSuccessPay"),
					qAuction.owner.id.as("ownerPk"),
					qAuction.auctionUUID.as("auctionUUID"),
					qAuction.id.as("auctionPk"),
					qAuction.auctionStatus.as("auctionStatus"),
					qAuction.auctionType.as("auctionType"),
					qAuction.createdAt.as("registerDate")
				)).from(qAuction)
			.where(
				//판매인가 구매인가
				chooseStatus(memberPageRequest.getProductStatus(), memberPageRequest.getAuctionStatus(), member)
			);
		long count = query.fetchCount();

		query.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(chooseFilter(memberPageRequest.getProductFilter()));

		List<MypageItemsResponse> result = query.fetch();

		double totalPage = Math.ceil((double)count / 5);

		return MyAuctionResponse.builder()
			.memberDetail(member.getMemberDetail())
			.memberPoint(member.getMemberPoint())
			.imgURL(member.getImageURL())
			.memberNickname(member.getMemberNickname())
			.currentPage(memberPageRequest.getMyPageNum() - 1)
			.totalPage((int)totalPage)
			.mypageItems(result)
			.build();

	}

	@Override
	public MyReverseResponse searchMyReversePage(Member member, MemberPageRequest memberPageRequest,
		Pageable pageable) {
		JPAQuery<MyReverseItemsResponse> query = jpaQueryFactory
			.select(
				Projections.bean(MyReverseItemsResponse.class,
					qAuction.auctionTitle.as("auctionTitle"),
					qAuction.auctionStartPrice.as("auctionStarePrice"),
					qAuction.auctionEndPrice.as("auctionSuccessPay"),
					qAuction.owner.id.as("ownerPk"),
					qAuction.auctionUUID.as("auctionUUID"),
					qAuction.id.as("auctionPk"),
					qAuction.auctionStatus.as("auctionStatus"),
					qAuction.auctionType.as("auctionType"),
					qAuction.createdAt.as("registerDate"),
					qReAuctionBid.reAucBidDatetime.as("reAucBidDateTime"),
					qReAuctionBid.reAucBidPrice.as("reAucBidPrice"),
					qAuctionHistory.auctionHistory.as("auctionHistory"),
					qAuctionHistory.historyDateTime.as("historyDateTime"),
					qAuctionHistory.historyDoneDateTime.as("historyDoneDateTime")
				))
			.from(qAuction)
			.leftJoin(qReAuctionBid)
			.on(qAuction.id.eq(qReAuctionBid.auction.id).and(qReAuctionBid.isNotNull()))
			.leftJoin(qAuctionHistory)
			.on(qAuction.id.eq(qAuctionHistory.auction.id).and(qAuctionHistory.isNotNull()))
			.where(
				//판매인가 구매인가
				chooseReverseStatus(memberPageRequest.getProductStatus(), memberPageRequest.getAuctionStatus(), member)
			);
		long count = query.fetchCount();

		query.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(chooseFilter(memberPageRequest.getProductFilter()));

		List<MyReverseItemsResponse> result = query.fetch();

		double totalPage = Math.ceil((double)count / 5);

		return MyReverseResponse.builder()
			.memberDetail(member.getMemberDetail())
			.memberPoint(member.getMemberPoint())
			.imgURL(member.getImageURL())
			.memberNickname(member.getMemberNickname())
			.currentPage(memberPageRequest.getMyPageNum() - 1)
			.totalPage((int)totalPage)
			.mypageItems(result)
			.build();

	}

	@Override
	public MyDiscountResponse searchMyDiscountPage(Member member, MemberPageRequest memberPageRequest,
		Pageable pageable) {
		JPAQuery<MyDiscountItemsResponse> query = jpaQueryFactory
			.select(
				Projections.bean(MyDiscountItemsResponse.class,
					qDiscount.discountDiscountedPrice.as("discountDiscountedPrice"),
					qDiscount.discountPrice.as("discountPrice"),
					qDiscount.discountEnd.as("discountEnd"),
					qDiscount.owner.id.as("ownerPk"),
					qDiscount.customer.id.as("customerPk"),
					qDiscount.id.as("discountPk"),
					qDiscount.discountUUID.as("discountUUID"),
					qDiscountHistory.historyDatetime.as("historyDatetime"),
					qDiscountHistory.historyDoneDatetime.as("historyDoneDatetime"),
					qDiscountHistory.historyStatus.as("historyStatus")
				))
			.from(qAuction)
			.leftJoin(qDiscountHistory)
			.on(qDiscount.id.eq(qDiscountHistory.discount.id));

		long count = query.fetchCount();

		query.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(chooseFilter(memberPageRequest.getProductFilter()));

		List<MyDiscountItemsResponse> result = query.fetch();

		double totalPage = Math.ceil((double)count / 5);

		return MyDiscountResponse.builder()
			.memberDetail(member.getMemberDetail())
			.memberPoint(member.getMemberPoint())
			.imgURL(member.getImageURL())
			.memberNickname(member.getMemberNickname())
			.currentPage(memberPageRequest.getMyPageNum() - 1)
			.totalPage((int)totalPage)
			.mypageItems(result)
			.build();

	}

	@Override
	public MyLikeResponse searchMyLikePage(Member member, Pageable pageable) {
		return null;
	}

	private Predicate chooseStatus(String productStatus, String auctionStatus, Member member) {
		LocalDateTime now = LocalDateTime.now();
		if (productStatus.equals("판매")) {
			if ("경매전".equals(auctionStatus)) {
				return qAuction.owner.id.eq(member.getId())
					.and(qAuction.auctionStartDate.after(now))
					.and(qAuction.auctionStatus.eq(AuctionStatus.BID));

			} else if ("경매중".equals(auctionStatus)) {
				// "판매" 및 "경매중" 경우에 대한 조건 추가
				return qAuction.owner.id.eq(member.getId())
					.and(qAuction.auctionStartDate.before(now)
						.and(qAuction.auctionEndDate.after(now)))
					.and(qAuction.auctionStatus.eq(AuctionStatus.BID));
			} else if ("경매완료".equals(auctionStatus)) {
				// "판매" 및 "경매완료" 경우에 대한 조건 추가
				return qAuction.owner.id.eq(member.getId())
					.and(qAuction.auctionStartDate.before(now))
					.and(qAuction.auctionStatus.eq(AuctionStatus.BID));
			}
		} else if (productStatus.equals("구매")) {
			if ("낙찰".equals(auctionStatus)) {
				return qAuction.customer.id.eq(member.getId())
					.and(qAuction.auctionEndPrice.isNotNull())
					.and(qAuctionHistory.auction.id.eq(qAuction.id))
					.and(qAuctionHistory.auctionHistory.eq(HistoryStatus.BEFORE_CONFIRM))
					.and(qAuction.auctionStatus.eq(AuctionStatus.BID));

			} else if ("구매완료".equals(auctionStatus)) {
				// "구매" 및 "구매완료" 경우에 대한 조건 추가
				return qAuction.customer.id.eq(member.getId())
					.and(qAuction.auctionEndPrice.isNotNull())
					.and(qAuctionHistory.auction.id.eq(qAuction.id))
					.and(qAuctionHistory.auctionHistory.eq(HistoryStatus.AFTER_CONFIRM))
					.and(qAuction.auctionStatus.eq(AuctionStatus.BID));
			}
		}
		return null;
	}

	private Predicate chooseReverseStatus(String productStatus, String auctionStatus, Member member) {
		LocalDateTime now = LocalDateTime.now();
		//역경매 - 판매 : 내가 팔려고 경매 참여하는것
		if (productStatus.equals("판매")) {
			if ("입찰중".equals(auctionStatus)) {
				return qReAuctionBid.auction.customer.id.eq(member.getId())
					.and(qReAuctionBid.isNotNull())
					.and(qAuction.auctionEndDate.after(now))
					.and(qAuction.auctionStatus.eq(AuctionStatus.REVERSE_BID));
			} else if ("낙찰".equals(auctionStatus)) {
				// "판매" 및 "경매중" 경우에 대한 조건 추가
				return qReAuctionBid.auction.customer.id.eq(member.getId())
					.and(qReAuctionBid.isNotNull())
					.and(qAuction.auctionEndDate.before(now))
					.and(qAuction.auctionStatus.eq(AuctionStatus.REVERSE_BID));
			} else if ("거래완료".equals(auctionStatus)) {
				// "판매" 및 "경매완료" 경우에 대한 조건 추가
				return qReAuctionBid.auction.customer.id.eq(member.getId())
					.and(qReAuctionBid.isNotNull())
					.and(qAuction.auctionEndDate.before(now))
					.and(qAuction.auctionStatus.eq(AuctionStatus.REVERSE_BID));
			}
			//역경매 - 구매 : 내가 살려고 경매 자의로 올린것
		} else if (productStatus.equals("구매")) {
			if ("경매중".equals(auctionStatus)) {
				return qReAuctionBid.auction.owner.id.eq(member.getId())
					.and(qReAuctionBid.isNotNull())
					.and(qAuction.auctionEndDate.before(now))
					.and(qAuction.auctionStatus.eq(AuctionStatus.REVERSE_BID));

			} else if ("입찰완료".equals(auctionStatus)) {
				// "구매" 및 "구매완료" 경우에 대한 조건 추가
				return qReAuctionBid.auction.owner.id.eq(member.getId())
					.and(qReAuctionBid.isNotNull())
					.and(qAuction.auctionEndDate.before(now))
					.and(qAuction.auctionStatus.eq(AuctionStatus.REVERSE_BID));

			} else if ("경매종료".equals(auctionStatus)) {
				// "구매" 및 "구매완료" 경우에 대한 조건 추가
				return qReAuctionBid.auction.owner.id.eq(member.getId())
					.and(qReAuctionBid.isNotNull())
					.and(qAuction.auctionEndDate.before(now))
					.and(qAuction.auctionStatus.eq(AuctionStatus.REVERSE_BID));
			}
		}
		return null;
	}

	private Predicate chooseDiscountStatus(String productStatus, String auctionStatus, Member member) {
		LocalDateTime now = LocalDateTime.now();
		if (productStatus.equals("판매")) {
			if ("판매중".equals(auctionStatus)) {
				return qDiscount.owner.id.eq(member.getId());
			} else if ("예약중".equals(auctionStatus)) {
				// "판매" 및 "경매중" 경우에 대한 조건 추가
				return qDiscount.owner.id.eq(member.getId())
					.and(qDiscountHistory.isNotNull())
					.and(qDiscountHistory.historyDoneDatetime.isNull());
			} else if ("판매완료".equals(auctionStatus)) {
				// "판매" 및 "경매완료" 경우에 대한 조건 추가
				return qDiscount.owner.id.eq(member.getId())
					.and(qDiscountHistory.isNotNull())
					.and(qDiscountHistory.historyDoneDatetime.isNotNull());
			}
			//역경매 - 구매 : 내가 살려고 경매 자의로 올린것
		} else if (productStatus.equals("구매")) {
			if ("예약중".equals(auctionStatus)) {
				return qDiscount.customer.id.eq(member.getId())
					.and(qDiscountHistory.isNotNull())
					.and(qDiscountHistory.historyDoneDatetime.isNull());

			} else if ("구매완료".equals(auctionStatus)) {
				// "구매" 및 "구매완료" 경우에 대한 조건 추가
				return qDiscount.customer.id.eq(member.getId())
					.and(qDiscountHistory.isNotNull())
					.and(qDiscountHistory.historyDoneDatetime.isNotNull());

			}
		}
		return null;
	}

	private OrderSpecifier chooseFilter(String productFilter) {
		if (productFilter.equals("최신순")) {
			// 높은 가격 순
			return new OrderSpecifier<>(Order.DESC, qAuction.auctionStartDate);
		} else if (productFilter.equals("고가순")) {
			// 낮은 가격 순
			return new OrderSpecifier<>(Order.ASC, qAuction.auctionStartPrice);
		} else if (productFilter.equals("저가순")) {
			// 기본 정렬 방식
			return new OrderSpecifier<>(Order.DESC, qAuction.auctionStartDate);
		}
		return null;
	}
}

//경매-판매-경매전인상태 	:0
//경매-판매-경매중인상태 	:1
//경매-판매-경매끝난상태 	:2
//경매-구매-낙찰			:3,4
//역경매-판매				:5
//역경매-구매				:6

//경매-판매-경매전
//경매제목
//이미지사진
//경매상태
//경매등록일
//경매시작가
//경매시작일시
//경매UUID

//경매-판매-경매중
//경매제목
//이미지사진
//경매상태
//경매등록일
//경매시작가
//경매종료일시
//경매UUID

//경매-판매-경매완료
//경매제목
//이미지사진
//경매상태
//경매등록일
//경매시작가
//경매UUID
//경매
//낙찰상태
//최종입찰가

//경매-구매-낙찰
//경매제목
//이미지사진
//경매제목
//판매자이름
//경매시작가
//낙찰일시
//낙찰가
//등록일
//auctionUUID

//역경매-판매-동일
//경매제목
//이미지사진
//구매자
//입찰가
//입찰날짜
//등록일
//역경매PK

//역경매-구매
//경매제목
//이미지사진
//경매이름
//판매자
//할인가격
//예약일