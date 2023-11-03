package com.example.aucation.auction.db.repository;

import com.example.aucation.auction.api.dto.AuctionPreResponse;
import com.example.aucation.auction.api.dto.AuctionPreResponseItem;
import com.example.aucation.auction.api.dto.AuctionSortRequest;
import com.example.aucation.auction.db.entity.QAuction;
import com.example.aucation.like.db.entity.QLikeAuction;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.entity.QMember;
import com.example.aucation.member.db.entity.Role;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class AuctionRepositoryImpl implements AuctionRepositoryCustom{
    private final JPAQueryFactory queryFactory;
    private final QAuction qAuction = QAuction.auction;
    private final QLikeAuction qLikeAuction = QLikeAuction.likeAuction;
    private final QMember qMember = QMember.member;
    private final int COUNT_IN_PAGE = 15;
    @Override
    public AuctionPreResponse searchPreAucToCondition(Member member, int pageNum, AuctionSortRequest searchCondition) {
        // 여기서 가져올꺼임
        NumberPath<Long> likeCnt = Expressions.numberPath(Long.class,"likeCnt");
        JPAQuery<AuctionPreResponseItem> query = queryFactory
                .select(
                        Projections.bean(AuctionPreResponseItem.class,
                                qAuction.id.as("auctionPk"),
                                qAuction.auctionTitle.as("auctionTitle"),
                                qAuction.auctionStartPrice,
                                qAuction.auctionStartDate.as("auctionStartTime"),
                                qMember.memberNickname.as("auctionOwnerNickname"),
                                qMember.memberRole.eq(Role.SHOP).as("auctionOwnerIsShop"),
                                qLikeAuction.count().as(likeCnt),
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
                .groupBy(qAuction.id);

        long count = query
                .fetchCount();

//        Sort sort = getSortByCondition(searchCondition.getAuctionCondition());
        Pageable pageable = PageRequest.of(pageNum - 1, COUNT_IN_PAGE);
        query.offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(getSortByCondition(searchCondition.getAuctionCondition(),likeCnt));
        System.out.println(qAuction.auctionStartDate.before(LocalDateTime.now()));
        List<AuctionPreResponseItem> result = query.fetch();


        System.out.println(count);

        double totalPage = Math.ceil((double) count/COUNT_IN_PAGE);
        AuctionPreResponse response =AuctionPreResponse.builder()
                .currentPage(pageNum)
                .totalPage((int) totalPage)
                .items(result)
                .build();
        System.out.println(response.toString());
        return response;

}
//    @Override
//    public List<Auction> searchIngAucByCondition(Member member, int pageNum, AuctionSortRequest searchCondition) {
//        return null;
//    }
//
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
