package com.example.aucation.chat.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatParticipants is a Querydsl query type for ChatParticipants
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatParticipants extends EntityPathBase<ChatParticipants> {

    private static final long serialVersionUID = 235714898L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatParticipants chatParticipants = new QChatParticipants("chatParticipants");

    public final com.example.aucation.common.entity.QBaseEntity _super = new com.example.aucation.common.entity.QBaseEntity(this);

    public final QChatRoom chatRoom;

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

    public QChatParticipants(String variable) {
        this(ChatParticipants.class, forVariable(variable), INITS);
    }

    public QChatParticipants(Path<? extends ChatParticipants> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatParticipants(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatParticipants(PathMetadata metadata, PathInits inits) {
        this(ChatParticipants.class, metadata, inits);
    }

    public QChatParticipants(Class<? extends ChatParticipants> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatRoom = inits.isInitialized("chatRoom") ? new QChatRoom(forProperty("chatRoom")) : null;
        this.member = inits.isInitialized("member") ? new com.example.aucation.member.db.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

