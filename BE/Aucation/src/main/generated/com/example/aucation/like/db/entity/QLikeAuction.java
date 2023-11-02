package com.example.aucation.like.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLikeAuction is a Querydsl query type for LikeAuction
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLikeAuction extends EntityPathBase<LikeAuction> {

    private static final long serialVersionUID = -411003087L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLikeAuction likeAuction = new QLikeAuction("likeAuction");

    public final com.example.aucation.common.entity.QBaseEntity _super = new com.example.aucation.common.entity.QBaseEntity(this);

    public final com.example.aucation.auction.db.entity.QAuction auction;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> createdBy = _super.createdBy;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedAt = _super.lastModifiedAt;

    //inherited
    public final NumberPath<Long> lastModifiedBy = _super.lastModifiedBy;

    public final com.example.aucation.member.db.entity.QMember member;

    public QLikeAuction(String variable) {
        this(LikeAuction.class, forVariable(variable), INITS);
    }

    public QLikeAuction(Path<? extends LikeAuction> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLikeAuction(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLikeAuction(PathMetadata metadata, PathInits inits) {
        this(LikeAuction.class, metadata, inits);
    }

    public QLikeAuction(Class<? extends LikeAuction> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.auction = inits.isInitialized("auction") ? new com.example.aucation.auction.db.entity.QAuction(forProperty("auction"), inits.get("auction")) : null;
        this.member = inits.isInitialized("member") ? new com.example.aucation.member.db.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

