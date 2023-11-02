package com.example.aucation.shop.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QShop is a Querydsl query type for Shop
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QShop extends EntityPathBase<Shop> {

    private static final long serialVersionUID = 889964754L;

    public static final QShop shop = new QShop("shop");

    public final com.example.aucation.common.entity.QBaseEntity _super = new com.example.aucation.common.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> createdBy = _super.createdBy;

    public final ListPath<com.example.aucation.follow.db.entity.Follow, com.example.aucation.follow.db.entity.QFollow> followList = this.<com.example.aucation.follow.db.entity.Follow, com.example.aucation.follow.db.entity.QFollow>createList("followList", com.example.aucation.follow.db.entity.Follow.class, com.example.aucation.follow.db.entity.QFollow.class, PathInits.DIRECT2);

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final BooleanPath isDeleted = _super.isDeleted;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> lastModifiedAt = _super.lastModifiedAt;

    //inherited
    public final NumberPath<Long> lastModifiedBy = _super.lastModifiedBy;

    public final StringPath ShopInfo = createString("ShopInfo");

    public final StringPath ShopIsFood = createString("ShopIsFood");

    public final StringPath ShopName = createString("ShopName");

    public final StringPath ShopTaxId = createString("ShopTaxId");

    public final StringPath ShopType = createString("ShopType");

    public QShop(String variable) {
        super(Shop.class, forVariable(variable));
    }

    public QShop(Path<? extends Shop> path) {
        super(path.getType(), path.getMetadata());
    }

    public QShop(PathMetadata metadata) {
        super(Shop.class, metadata);
    }

}

