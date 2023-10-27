package com.example.aucation.member.api.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.aucation.common.dto.EmailResponse;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.DuplicateException;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.common.service.RegisterMail;
import com.example.aucation.member.api.dto.MemberNickRequest;
import com.example.aucation.member.api.dto.SignupRequest;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.entity.Role;
import com.example.aucation.member.db.entity.SocialType;
import com.example.aucation.member.db.repository.MemberRepository;
import com.sun.jdi.request.DuplicateRequestException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

	private final PasswordEncoder passwordEncoder;
	private final MemberRepository memberRepository;
	private final RegisterMail registerMail;

	@Transactional
	public void signup(SignupRequest signupRequest) {
		validateMemberId(signupRequest.getMemberId());
		validateMemberEmail(signupRequest.getMemberEmail());
		Member member = Member.builder()
			.memberId(signupRequest.getMemberId())
			.memberPw(passwordEncoder.encode(signupRequest.getMemberPw()))
			.memberEmail(signupRequest.getMemberEmail())
			.memberRole(Role.CERTIFIED)
			.socialType(SocialType.NORMAL)
			.build();
		memberRepository.save(member);
	}

	public EmailResponse verifyemail(String memberEmail) throws Exception {
		validateMemberEmail(memberEmail);
		String code = registerMail.sendSimpleMessage(memberEmail,"회원가입");
		return EmailResponse.of(code);

	}

	public void verifynick(MemberNickRequest memberNickname) {
		if(memberRepository.existsByMemberNickname(memberNickname.getMemberNickname())) {
			throw new DuplicateException(ApplicationError.DUPLICATE_NICKNAME);
		}
	}

	private void validateMemberEmail(String memberEmail) {
		if(memberRepository.existsByMemberEmail(memberEmail)) {
			throw new DuplicateException(ApplicationError.DUPLICATE_MEMBER_EMAIL);
		}
	}

	private void validateMemberId(String memberId) {
		if(memberRepository.existsByMemberId(memberId)) {
			throw new DuplicateException(ApplicationError.DUPLICATE_USERNAME);
		}

	}
}
