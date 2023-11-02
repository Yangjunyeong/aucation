package com.example.aucation.auction.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAuctionHistory is a Querydsl query type for AuctionHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAuctionHistory extends EntityPathBase<AuctionHistory> {

    private static final long serialVersionUID = -145799474L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAuctionHistory auctionHistory = new QAuctionHistory("auctionHistory");

    public final com.example.aucation.common.entity.QBaseEntity _super = new com.example.aucation.common.entity.QBaseEntity(this);

    public final QAuction auction;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> createdBy = _super.createdBy;

    public final com.example.aucation.member.db.entity.QMember customer;

    public final DateTimePath<java.time.LocalDateTime> HistoryDateTime = createDateTime("HistoryDateTime", java.time.LocalDateTime.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedAt = _super.lastModifiedAt;

    //inherited
    public final NumberPath<Long> lastModifiedBy = _super.lastModifiedBy;

    public final com.example.aucation.member.db.entity.QMember owner;

    public QAuctionHistory(String variable) {
        this(AuctionHistory.class, forVariable(variable), INITS);
    }

    public QAuctionHistory(Path<? extends AuctionHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAuctionHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAuctionHistory(PathMetadata metadata, PathInits inits) {
        this(AuctionHistory.class, metadata, inits);
    }

    public QAuctionHistory(Class<? extends AuctionHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.auction = inits.isInitialized("auction") ? new QAuction(forProperty("auction"), inits.get("auction")) : null;
        this.customer = inits.isInitialized("customer") ? new com.example.aucation.member.db.entity.QMember(forProperty("customer"), inits.get("customer")) : null;
        this.owner = inits.isInitialized("owner") ? new com.example.aucation.member.db.entity.QMember(forProperty("owner"), inits.get("owner")) : null;
    }

}

