package com.example.aucation.alarm.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAlram is a Querydsl query type for Alram
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlram extends EntityPathBase<Alram> {

    private static final long serialVersionUID = 1457191876L;

    public static final QAlram alram = new QAlram("alram");

    public final com.example.aucation.common.entity.QBaseEntity _super = new com.example.aucation.common.entity.QBaseEntity(this);

    public final StringPath alramBody = createString("alramBody");

    public final EnumPath<AlarmType> alramType = createEnum("alramType", AlarmType.class);

    public final NumberPath<Long> alramTypePk = createNumber("alramTypePk", Long.class);

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

    public QAlram(String variable) {
        super(Alram.class, forVariable(variable));
    }

    public QAlram(Path<? extends Alram> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAlram(PathMetadata metadata) {
        super(Alram.class, metadata);
    }

}

