package com.example.aucation.member.db.repository;

import org.springframework.stereotype.Repository;

import com.example.aucation.member.api.dto.MemberPageRequest;
import com.example.aucation.member.api.dto.MypageResponse;
import com.example.aucation.member.db.entity.Member;

@Repository
public interface MemberRepositoryCustom {

	MypageResponse searchMyAuctionPage(Member member, MemberPageRequest memberPageRequest);


}
