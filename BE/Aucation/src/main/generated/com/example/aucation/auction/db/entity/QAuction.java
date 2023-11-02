package com.example.aucation.auction.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAuction is a Querydsl query type for Auction
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAuction extends EntityPathBase<Auction> {

    private static final long serialVersionUID = -2035497242L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAuction auction = new QAuction("auction");

    public final com.example.aucation.common.entity.QBaseEntity _super = new com.example.aucation.common.entity.QBaseEntity(this);

    public final ListPath<AuctionBid, QAuctionBid> auctionBidList = this.<AuctionBid, QAuctionBid>createList("auctionBidList", AuctionBid.class, QAuctionBid.class, PathInits.DIRECT2);

    public final StringPath auctionDetail = createString("auctionDetail");

    public final DateTimePath<java.time.LocalDateTime> auctionEndDate = createDateTime("auctionEndDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> auctionEndPrice = createNumber("auctionEndPrice", Integer.class);

    public final NumberPath<Double> auctionMeetingLat = createNumber("auctionMeetingLat", Double.class);

    public final NumberPath<Double> auctionMeetingLng = createNumber("auctionMeetingLng", Double.class);

    public final DateTimePath<java.time.LocalDateTime> auctionStartDate = createDateTime("auctionStartDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> auctionStartPrice = createNumber("auctionStartPrice", Integer.class);

    public final EnumPath<AuctionStatus> auctionStatus = createEnum("auctionStatus", AuctionStatus.class);

    public final StringPath auctionTitle = createString("auctionTitle");

    public final StringPath auctionType = createString("auctionType");

    public final StringPath auctionUUID = createString("auctionUUID");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> createdBy = _super.createdBy;

    public final com.example.aucation.member.db.entity.QMember customer;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedAt = _super.lastModifiedAt;

    //inherited
    public final NumberPath<Long> lastModifiedBy = _super.lastModifiedBy;

    public final ListPath<com.example.aucation.like.db.entity.LikeAuction, com.example.aucation.like.db.entity.QLikeAuction> likeAuctionList = this.<com.example.aucation.like.db.entity.LikeAuction, com.example.aucation.like.db.entity.QLikeAuction>createList("likeAuctionList", com.example.aucation.like.db.entity.LikeAuction.class, com.example.aucation.like.db.entity.QLikeAuction.class, PathInits.DIRECT2);

    public final com.example.aucation.member.db.entity.QMember owner;

    public final ListPath<com.example.aucation.photo.db.Photo, com.example.aucation.photo.db.QPhoto> photoList = this.<com.example.aucation.photo.db.Photo, com.example.aucation.photo.db.QPhoto>createList("photoList", com.example.aucation.photo.db.Photo.class, com.example.aucation.photo.db.QPhoto.class, PathInits.DIRECT2);

    public QAuction(String variable) {
        this(Auction.class, forVariable(variable), INITS);
    }

    public QAuction(Path<? extends Auction> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAuction(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAuction(PathMetadata metadata, PathInits inits) {
        this(Auction.class, metadata, inits);
    }

    public QAuction(Class<? extends Auction> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.customer = inits.isInitialized("customer") ? new com.example.aucation.member.db.entity.QMember(forProperty("customer"), inits.get("customer")) : null;
        this.owner = inits.isInitialized("owner") ? new com.example.aucation.member.db.entity.QMember(forProperty("owner"), inits.get("owner")) : null;
    }

}

