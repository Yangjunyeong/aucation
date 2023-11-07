package com.example.aucation.member.db.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.example.aucation.auction.db.entity.AuctionStatus;
import com.example.aucation.auction.db.entity.QAuction;
import com.example.aucation.member.api.dto.MemberPageRequest;
import com.example.aucation.member.api.dto.MypageItemsResponse;
import com.example.aucation.member.api.dto.MypageLikeResponse;
import com.example.aucation.member.api.dto.MypageResponse;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.entity.QMember;
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

	//0: 경매, 1: 역경매

	//0: 판매, 1: 구매

	//경매
	//0: 경매전,	1: 경매중, 	2: 경매확정
	//4: 낙찰,	5:	경매 완료

	//역경매
	//0: 입찰중,	1: 낙찰		2:거래완료
	//4: 예약중,	5: 구매완료

	//0: 최신수, 1: 인기순, 2: 저가순, 3: 고가순

	private final JPAQueryFactory jpaQueryFactory;

	private final QMember qMember = QMember.member;

	private final QAuction qAuction = QAuction.auction;

	@Override
	public MypageResponse searchMyAuctionPage(Member member, MemberPageRequest memberPageRequest, Pageable pageable) {

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
				chooseType(memberPageRequest.getProductType()),
				chooseStatus(memberPageRequest.getProductStatus(), member),
				chooseDate(memberPageRequest.getAuctionStatus(), member)
			).leftJoin(qMember)
			.on(qAuction.owner.eq(qMember))
			.groupBy(qAuction.id);

		long count = query.fetchCount();

		query.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.orderBy(chooseFilter(memberPageRequest.getProductFilter()));
		//System.out.println(qAuction.auctionStartDate.before(LocalDateTime.now()));

		List<MypageItemsResponse> result = query.fetch();

		double totalPage = Math.ceil((double)count / 5);
		MypageResponse response = MypageResponse.builder()
			.memberDetail(member.getMemberDetail())
			.memberPoint(member.getMemberPoint())
			.imgURL(member.getImageURL())
			.memberNickname(member.getMemberNickname())
			.currentPage(memberPageRequest.getMyPageNum() - 1)
			.totalPage((int)totalPage)
			.mypageItems(result)
			.build();

		return response;

	}

	private Predicate chooseType(int productType) {
		if (productType == 0) {
			return qAuction.auctionStatus.eq(AuctionStatus.valueOf(String.valueOf(AuctionStatus.BID)));
		} else {
			return qAuction.auctionStatus.eq(AuctionStatus.valueOf(String.valueOf(AuctionStatus.REVERSE_BID)));
		}
	}

	private Predicate chooseStatus(int productStatus, Member member) {
		if (productStatus == 0) {
			return qAuction.owner.id.eq(member.getId());
		} else {
			return qAuction.customer.id.eq(member.getId());
		}
	}

	private Predicate chooseDate(int auctionStatus, Member member) {
		LocalDateTime now = LocalDateTime.now(); // 현재 LocalDateTime 값 가져오기
		if (auctionStatus == 0) {
			//경매전인상태
			return qAuction.auctionStartDate.after(now);
		} else if (auctionStatus == 1) {
			//경매중인상태
			return qAuction.auctionStartDate.before(now).and(qAuction.auctionEndDate.after(now));
		} else if (auctionStatus == 2) {
			//경매	끝난상태
			return qAuction.auctionEndDate.before(now);
		} else if (auctionStatus == 3) {
			return qAuction.customer.id.eq(member.getId());
		} else {
			return null;
		}
	}

	private OrderSpecifier chooseFilter(int productFilter) {
		if (productFilter == 2) {
			// 높은 가격 순
			return new OrderSpecifier<>(Order.DESC, qAuction.auctionStartPrice);
		} else if (productFilter == 1) {
			// 낮은 가격 순
			return new OrderSpecifier<>(Order.ASC, qAuction.auctionStartPrice);
		} else {
			// 기본 정렬 방식
			return new OrderSpecifier<>(Order.DESC, qAuction.auctionStartDate);
		}
	}
}
