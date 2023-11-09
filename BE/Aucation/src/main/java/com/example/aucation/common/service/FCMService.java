package com.example.aucation.common.service;

import org.springframework.stereotype.Service;

import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.member.api.dto.FCMTokenReq;
import com.example.aucation.member.api.dto.FCMTokenRes;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FCMService {

	private final MemberRepository memberRepository;

	private static final String SUCCESS_TOKEN_SAVE = "성공적으로 토큰이 저장되었습니다";
	public FCMTokenRes saveToken(long memberPk, FCMTokenReq fcmTokenReq) {

		Member member = memberRepository.findById(memberPk).orElseThrow(()-> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));

		member.updateFCMToken(fcmTokenReq.getToken());

		return FCMTokenRes.builder().message(SUCCESS_TOKEN_SAVE).build();

	}
}
