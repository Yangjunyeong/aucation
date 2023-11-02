package com.example.aucation.member.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -179982318L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final com.example.aucation.common.entity.QBaseEntity _super = new com.example.aucation.common.entity.QBaseEntity(this);

    public final QAddress address;

    public final ListPath<com.example.aucation.auction.db.entity.AuctionBid, com.example.aucation.auction.db.entity.QAuctionBid> auctionBidList = this.<com.example.aucation.auction.db.entity.AuctionBid, com.example.aucation.auction.db.entity.QAuctionBid>createList("auctionBidList", com.example.aucation.auction.db.entity.AuctionBid.class, com.example.aucation.auction.db.entity.QAuctionBid.class, PathInits.DIRECT2);

    public final ListPath<com.example.aucation.auction.db.entity.Auction, com.example.aucation.auction.db.entity.QAuction> auctionCustomerList = this.<com.example.aucation.auction.db.entity.Auction, com.example.aucation.auction.db.entity.QAuction>createList("auctionCustomerList", com.example.aucation.auction.db.entity.Auction.class, com.example.aucation.auction.db.entity.QAuction.class, PathInits.DIRECT2);

    public final ListPath<com.example.aucation.auction.db.entity.AuctionHistory, com.example.aucation.auction.db.entity.QAuctionHistory> auctionHistoryCustomerList = this.<com.example.aucation.auction.db.entity.AuctionHistory, com.example.aucation.auction.db.entity.QAuctionHistory>createList("auctionHistoryCustomerList", com.example.aucation.auction.db.entity.AuctionHistory.class, com.example.aucation.auction.db.entity.QAuctionHistory.class, PathInits.DIRECT2);

    public final ListPath<com.example.aucation.auction.db.entity.AuctionHistory, com.example.aucation.auction.db.entity.QAuctionHistory> auctionHistoryOwnerList = this.<com.example.aucation.auction.db.entity.AuctionHistory, com.example.aucation.auction.db.entity.QAuctionHistory>createList("auctionHistoryOwnerList", com.example.aucation.auction.db.entity.AuctionHistory.class, com.example.aucation.auction.db.entity.QAuctionHistory.class, PathInits.DIRECT2);

    public final ListPath<com.example.aucation.auction.db.entity.Auction, com.example.aucation.auction.db.entity.QAuction> auctionOwnerList = this.<com.example.aucation.auction.db.entity.Auction, com.example.aucation.auction.db.entity.QAuction>createList("auctionOwnerList", com.example.aucation.auction.db.entity.Auction.class, com.example.aucation.auction.db.entity.QAuction.class, PathInits.DIRECT2);

    public final ListPath<com.example.aucation.chat.db.entity.ChatMessage, com.example.aucation.chat.db.entity.QChatMessage> chatMessageList = this.<com.example.aucation.chat.db.entity.ChatMessage, com.example.aucation.chat.db.entity.QChatMessage>createList("chatMessageList", com.example.aucation.chat.db.entity.ChatMessage.class, com.example.aucation.chat.db.entity.QChatMessage.class, PathInits.DIRECT2);

    public final ListPath<com.example.aucation.chat.db.entity.ChatParticipants, com.example.aucation.chat.db.entity.QChatParticipants> chatParticipantsList = this.<com.example.aucation.chat.db.entity.ChatParticipants, com.example.aucation.chat.db.entity.QChatParticipants>createList("chatParticipantsList", com.example.aucation.chat.db.entity.ChatParticipants.class, com.example.aucation.chat.db.entity.QChatParticipants.class, PathInits.DIRECT2);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> createdBy = _super.createdBy;

    public final ListPath<com.example.aucation.discount.db.entity.DiscountHistory, com.example.aucation.discount.db.entity.QDiscountHistory> discountHistoryList = this.<com.example.aucation.discount.db.entity.DiscountHistory, com.example.aucation.discount.db.entity.QDiscountHistory>createList("discountHistoryList", com.example.aucation.discount.db.entity.DiscountHistory.class, com.example.aucation.discount.db.entity.QDiscountHistory.class, PathInits.DIRECT2);

    public final ListPath<com.example.aucation.discount.db.entity.Discount, com.example.aucation.discount.db.entity.QDiscount> discountList = this.<com.example.aucation.discount.db.entity.Discount, com.example.aucation.discount.db.entity.QDiscount>createList("discountList", com.example.aucation.discount.db.entity.Discount.class, com.example.aucation.discount.db.entity.QDiscount.class, PathInits.DIRECT2);

    public final ListPath<com.example.aucation.follow.db.entity.Follow, com.example.aucation.follow.db.entity.QFollow> followList = this.<com.example.aucation.follow.db.entity.Follow, com.example.aucation.follow.db.entity.QFollow>createList("followList", com.example.aucation.follow.db.entity.Follow.class, com.example.aucation.follow.db.entity.QFollow.class, PathInits.DIRECT2);

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedAt = _super.lastModifiedAt;

    //inherited
    public final NumberPath<Long> lastModifiedBy = _super.lastModifiedBy;

    public final ListPath<com.example.aucation.like.db.entity.LikeAuction, com.example.aucation.like.db.entity.QLikeAuction> likeAuctionList = this.<com.example.aucation.like.db.entity.LikeAuction, com.example.aucation.like.db.entity.QLikeAuction>createList("likeAuctionList", com.example.aucation.like.db.entity.LikeAuction.class, com.example.aucation.like.db.entity.QLikeAuction.class, PathInits.DIRECT2);

    public final StringPath memberBanned = createString("memberBanned");

    public final StringPath memberEmail = createString("memberEmail");

    public final StringPath memberFCM = createString("memberFCM");

    public final StringPath memberId = createString("memberId");

    public final StringPath memberNickname = createString("memberNickname");

    public final NumberPath<Integer> memberPoint = createNumber("memberPoint", Integer.class);

    public final StringPath memberPw = createString("memberPw");

    public final StringPath memberRefresh = createString("memberRefresh");

    public final EnumPath<Role> memberRole = createEnum("memberRole", Role.class);

    public final com.example.aucation.shop.db.entity.QShop shop;

    public final EnumPath<SocialType> socialType = createEnum("socialType", SocialType.class);

    public QMember(String variable) {
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.address = inits.isInitialized("address") ? new QAddress(forProperty("address")) : null;
        this.shop = inits.isInitialized("shop") ? new com.example.aucation.shop.db.entity.QShop(forProperty("shop")) : null;
    }

}

