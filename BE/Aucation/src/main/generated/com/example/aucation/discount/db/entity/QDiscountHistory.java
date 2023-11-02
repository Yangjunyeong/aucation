package com.example.aucation.discount.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDiscountHistory is a Querydsl query type for DiscountHistory
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDiscountHistory extends EntityPathBase<DiscountHistory> {

    private static final long serialVersionUID = 793238466L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDiscountHistory discountHistory = new QDiscountHistory("discountHistory");

    public final com.example.aucation.common.entity.QBaseEntity _super = new com.example.aucation.common.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> createdBy = _super.createdBy;

    public final QDiscount discount;

    public final DateTimePath<java.time.LocalDateTime> HistoryDatetime = createDateTime("HistoryDatetime", java.time.LocalDateTime.class);

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedAt = _super.lastModifiedAt;

    //inherited
    public final NumberPath<Long> lastModifiedBy = _super.lastModifiedBy;

    public final com.example.aucation.member.db.entity.QMember member;

    public QDiscountHistory(String variable) {
        this(DiscountHistory.class, forVariable(variable), INITS);
    }

    public QDiscountHistory(Path<? extends DiscountHistory> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDiscountHistory(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDiscountHistory(PathMetadata metadata, PathInits inits) {
        this(DiscountHistory.class, metadata, inits);
    }

    public QDiscountHistory(Class<? extends DiscountHistory> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.discount = inits.isInitialized("discount") ? new QDiscount(forProperty("discount"), inits.get("discount")) : null;
        this.member = inits.isInitialized("member") ? new com.example.aucation.member.db.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

