package com.example.aucation.auction.db.repository;

import com.example.aucation.auction.api.dto.*;
import com.example.aucation.auction.db.entity.QAuction;
import com.example.aucation.auction.db.entity.QReAuctionBid;
import com.example.aucation.common.redis.dto.SaveAuctionBIDRedis;
import com.example.aucation.like.db.entity.QLikeAuction;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.entity.QMember;
import com.example.aucation.member.db.entity.Role;
import com.example.aucation.photo.db.QPhoto;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.*;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AuctionRepositoryImpl implements AuctionRepositoryCustom{
    private final JPAQueryFactory queryFactory;
    private final QAuction qAuction = QAuction.auction;
    private final QLikeAuction qLikeAuction = QLikeAuction.likeAuction;
    private final QReAuctionBid qReAuctionBid = QReAuctionBid.reAuctionBid;
    private final QMember qMember = QMember.member;
    private final QPhoto qPhoto = QPhoto.photo;
    private final RedisTemplate<String, SaveAuctionBIDRedis> redisTemplate;

    @Override
    public AuctionListResponse searchPreAucToCondition(Member member, int pageNum,
                                                       AuctionSortRequest searchCondition, Pageable pageable) {
        // 여기서 가져올꺼임
        NumberPath<Long> likeCnt = Expressions.numberPath(Long.class,"likeCnt");
        JPAQuery<AuctionPreResponseItem> query = queryFactory
                .select(
                        Projections.bean(AuctionPreResponseItem.class,
                                qAuction.id.as("auctionPk"),
                                qAuction.auctionTitle.as("auctionTitle"),
                                qAuction.auctionStartPrice.as("auctionStartPrice"),
                                qAuction.auctionStartDate.as("auctionStartTime"),
                                qMember.memberNickname.as("auctionOwnerNickname"),
                                qMember.memberRole.eq(Role.SHOP).as("auctionOwnerIsShop"),
                                qLikeAuction.countDistinct().as(likeCnt),
                                qPhoto.imgUrl.min().as("auctionImg"),
                                new CaseBuilder()
                                        .when(
                                                JPAExpressions.selectOne()
                                                        .from(qLikeAuction)
                                                        .where(qLikeAuction.auction.eq(qAuction))
                                                            .where(qLikeAuction.member.eq(member)) // Replace myUser with your user reference
                                                        .exists()
                                        )
                                        .then(true)
                                        .otherwise(false).as("isLike")
                        )
                ).from(qAuction)
                .where(qAuction.auctionStartDate.after(LocalDateTime.now()),
                        keywordEq(searchCondition.getSearchType(), searchCondition.getSearchKeyword()),
                        catalogEq(searchCondition.getAuctionCatalog())
                ).leftJoin(qLikeAuction)
                .on(qLikeAuction.auction.eq(qAuction))
                .leftJoin(qMember)
                .on(qAuction.owner.eq(qMember))
                .leftJoin(qPhoto)
                .on(qPhoto.auction.eq(qAuction))
                .groupBy(qAuction);

        long count = query
                .fetchCount();

        query.offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(getSortByCondition(searchCondition.getAuctionCondition(),likeCnt));
        List<AuctionPreResponseItem> result = query.fetch();
        double totalPage = Math.ceil((double) count/pageable.getPageSize());
        return AuctionListResponse.builder()
                .nowTime(LocalDateTime.now())
                .currentPage(pageNum)
                .totalPage(totalPage)
                .preItems(result)
                .build();
}
    @Override
    public AuctionListResponse searchIngAucByCondition(Member member, int pageNum,
                                                       AuctionSortRequest searchCondition, Pageable pageable) {
        NumberPath<Long> likeCnt = Expressions.numberPath(Long.class,"likeCnt");
        JPAQuery<AuctionIngResponseItem> query = queryFactory
                .select(
                        Projections.bean(AuctionIngResponseItem.class,
                                qAuction.id.as("auctionPk"),
                                qAuction.auctionUUID.as("auctionUUID"),
                                qAuction.auctionTitle.as("auctionTitle"),
                                qAuction.auctionStartPrice.as("auctionStartPrice"),
                                qAuction.auctionEndDate.as("auctionEndTime"),
                                qMember.memberNickname.as("auctionOwnerNickname"),
                                qLikeAuction.countDistinct().as(likeCnt),
                                qPhoto.imgUrl.min().as("auctionImg"),
                                new CaseBuilder()
                                        .when(
                                                JPAExpressions.selectOne()
                                                        .from(qLikeAuction)
                                                        .where(qLikeAuction.auction.eq(qAuction))
                                                        .where(qLikeAuction.member.eq(member)) // Replace myUser with your user reference
                                                        .exists()
                                        )
                                        .then(true)
                                        .otherwise(false).as("isLike")
                        )
                )
                .from(qAuction)
                .where(qAuction.auctionStartDate.before(LocalDateTime.now())
                                .and(qAuction.auctionEndDate.after(LocalDateTime.now())),
                        keywordEq(searchCondition.getSearchType(), searchCondition.getSearchKeyword()),
                        catalogEq(searchCondition.getAuctionCatalog())
                )
                .leftJoin(qLikeAuction)
                .on(qLikeAuction.auction.eq(qAuction))
                .leftJoin(qMember)
                .on(qAuction.owner.eq(qMember))
                .leftJoin(qPhoto)
                .on(qPhoto.auction.eq(qAuction))
                .groupBy(qAuction);

        long count = query
                .fetchCount();

        query.offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(getSortByCondition(searchCondition.getAuctionCondition(),likeCnt));
        List<AuctionIngResponseItem> result = query.fetch();

        double totalPage = Math.ceil((double) count/pageable.getPageSize());


        for (AuctionIngResponseItem item : result) {
            List<SaveAuctionBIDRedis> bidList = redisTemplate.opsForList().range(item.getAuctionUUID()
                    ,0,-1);
            if(bidList ==null || bidList.isEmpty()){
                item.setAuctionTopBidPrice(item.getAuctionStartPrice());
                item.setAuctionCurCnt(0);
                continue;
            }
            Collections.sort(bidList);
            item.setAuctionTopBidPrice(bidList.get(0).getBidPrice());
            item.setAuctionCurCnt(bidList.get(0).getHeadCnt());
        }

        return AuctionListResponse.builder()
                .nowTime(LocalDateTime.now())
                .currentPage(pageNum)
                .totalPage(totalPage)
                .ingItems(result)
                .build();

    }

    @Override
    public AuctionDetailResponse searchDetailAucToPk(Long auctionPk, Long memberPk) {
        NumberPath<Long> likeCnt = Expressions.numberPath(Long.class,"likeCnt");
        JPAQuery<AuctionDetailResponse> query = queryFactory
                .select(
                        Projections.bean(AuctionDetailResponse.class,
                                qAuction.id.as("auctionPk"),
                                qAuction.auctionUUID.as("auctionUUID"),
                                qAuction.auctionStatus.as("auctionStatus"),
                                qAuction.auctionType.as("auctionType"),
                                qAuction.auctionTitle.as("auctionTitle"),
                                qMember.memberNickname.as("auctionOwnerNickname"),
                                qMember.imageURL.as("auctionOwnerPhoto"),
                                qAuction.auctionMeetingLat.as("auctionMeetingLat"),
                                qAuction.auctionMeetingLng.as("auctionMeetingLng"),
                                qAuction.auctionStartPrice.as("auctionStartPrice"),
                                qAuction.auctionDetail.as("auctionInfo"),
                                qAuction.auctionStartDate.as("auctionStartTime"),
                                qAuction.auctionEndDate.as("auctionEndTime"),
                                qLikeAuction.countDistinct().as(likeCnt),
                                new CaseBuilder()
                                        .when(
                                                JPAExpressions.selectOne()
                                                        .from(qLikeAuction)
                                                        .where(qLikeAuction.auction.eq(qAuction))
                                                        .where(qLikeAuction.member.id.eq(memberPk)) // Replace myUser with your user reference
                                                        .exists()
                                        )
                                        .then(true)
                                        .otherwise(false)
                                        .as("isLike")
                        )
                )
                .from(qAuction)
                .where(qAuction.id.eq(auctionPk))
                .leftJoin(qLikeAuction)
                .on(qLikeAuction.auction.eq(qAuction))
                .leftJoin(qMember)
                .on(qAuction.owner.eq(qMember))
                .groupBy(qAuction);

        AuctionDetailResponse result = query.fetchOne();
        return result;
    }

    @Override
    public AuctionDetailResponse searchDetailReAucToPk(Long auctionPk, Long memberPk) {
        NumberPath<Long> likeCnt = Expressions.numberPath(Long.class,"likeCnt");
        JPAQuery<AuctionDetailResponse> query = queryFactory
                .select(
                        Projections.bean(AuctionDetailResponse.class,
                                qAuction.id.as("auctionPk"),
                                qAuction.auctionStatus.as("auctionStatus"),
                                qAuction.auctionType.as("auctionType"),
                                qAuction.auctionTitle.as("auctionTitle"),
                                qMember.memberNickname.as("auctionOwnerNickname"),
                                qMember.imageURL.as("auctionOwnerPhoto"),
                                qAuction.auctionMeetingLat.as("auctionMeetingLat"),
                                qAuction.auctionMeetingLng.as("auctionMeetingLng"),
                                qAuction.auctionStartPrice.as("auctionStartPrice"),
                                qAuction.auctionDetail.as("auctionInfo"),
                                qAuction.auctionStartDate.as("auctionStartTime"),
                                qAuction.auctionEndDate.as("auctionEndTime"),
                                qAuction.owner.id.eq(memberPk).as("isOwner"),
                                qLikeAuction.countDistinct().as(likeCnt),
                                new CaseBuilder()
                                        .when(
                                                JPAExpressions.selectOne()
                                                        .from(qLikeAuction)
                                                        .where(qLikeAuction.auction.eq(qAuction))
                                                        .where(qLikeAuction.member.id.eq(memberPk)) // Replace myUser with your user reference
                                                        .exists()
                                        )
                                        .then(true)
                                        .otherwise(false)
                                        .as("isLike")
                        )
                )
                .from(qAuction)
                .where(qAuction.id.eq(auctionPk))
                .leftJoin(qLikeAuction)
                .on(qLikeAuction.auction.eq(qAuction))
                .leftJoin(qMember)
                .on(qAuction.owner.eq(qMember))
                .groupBy(qAuction);

        AuctionDetailResponse result = query.fetchOne();
        return result;
    }

//    @Override
//    public List<Auction> searchReAucByCondition(Member member, int pageNum, AuctionSortRequest searchCondition) {
//        // 여기서 가져올꺼임
////        queryFactory.select()
//
//        return null;
//    }

    private BooleanExpression catalogEq(String catalog) {
        if (catalog == null) {
            return null;
        }
        return qAuction.auctionType.eq(catalog);
    }

    private BooleanExpression keywordEq(int type, String keyword) {
        if (keyword == null) {
            return null;
        }
        if(type == 0){
            return qAuction.auctionTitle.contains(keyword);
        }else{
            return qAuction.owner.memberNickname.contains(keyword);
        }

    }

    private OrderSpecifier getSortByCondition(int condition, NumberPath likeCnt) {
         if (condition == 2) {
            // 높은 가격 순
            return new OrderSpecifier<>(Order.DESC, qAuction.auctionStartPrice);
        } else if (condition == 3) {
            // 낮은 가격 순
             return new OrderSpecifier<>(Order.ASC, qAuction.auctionStartPrice);
        } else if (condition == 4) {
            // 좋아요 순
             return new OrderSpecifier<>(Order.DESC, likeCnt);
        } else {
            // 기본 정렬 방식
             return new OrderSpecifier<>(Order.DESC, qAuction.auctionStartDate);
        }
    }

}
