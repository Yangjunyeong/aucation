package com.example.aucation.auction.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAuctionBid is a Querydsl query type for AuctionBid
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAuctionBid extends EntityPathBase<AuctionBid> {

    private static final long serialVersionUID = 1144982583L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAuctionBid auctionBid = new QAuctionBid("auctionBid");

    public final QAuction auction;

    public final DateTimePath<java.time.LocalDateTime> AuctionBidDatetime = createDateTime("AuctionBidDatetime", java.time.LocalDateTime.class);

    public final StringPath auctionBidPk = createString("auctionBidPk");

    public final NumberPath<Integer> AuctionBidPrice = createNumber("AuctionBidPrice", Integer.class);

    public final com.example.aucation.member.db.entity.QMember member;

    public QAuctionBid(String variable) {
        this(AuctionBid.class, forVariable(variable), INITS);
    }

    public QAuctionBid(Path<? extends AuctionBid> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAuctionBid(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAuctionBid(PathMetadata metadata, PathInits inits) {
        this(AuctionBid.class, metadata, inits);
    }

    public QAuctionBid(Class<? extends AuctionBid> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.auction = inits.isInitialized("auction") ? new QAuction(forProperty("auction"), inits.get("auction")) : null;
        this.member = inits.isInitialized("member") ? new com.example.aucation.member.db.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

