package com.example.aucation.member.db.repository;

import org.springframework.stereotype.Repository;

import com.example.aucation.auction.db.entity.QAuction;
import com.example.aucation.member.db.entity.QMember;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom{

	//private final JPAQueryFactory jpaQueryFactory;

	private final QMember qMember = QMember.member;

	private final QAuction qAuction = QAuction.auction;

}
