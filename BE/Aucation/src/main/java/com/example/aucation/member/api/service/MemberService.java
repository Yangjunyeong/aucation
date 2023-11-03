package com.example.aucation.member.api.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.aucation.common.dto.EmailResponse;
import com.example.aucation.common.error.ApplicationError;
import com.example.aucation.common.error.DuplicateException;
import com.example.aucation.common.error.NotFoundException;
import com.example.aucation.common.service.RegisterMail;
import com.example.aucation.member.api.dto.MemberPageRequest;
import com.example.aucation.member.api.dto.MyPageRequest;
import com.example.aucation.member.api.dto.MypageResponse;
import com.example.aucation.member.api.dto.SignupRequest;
import com.example.aucation.member.db.entity.Member;
import com.example.aucation.member.db.entity.Role;
import com.example.aucation.member.db.entity.SocialType;
import com.example.aucation.member.db.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

	private final PasswordEncoder passwordEncoder;
	private final MemberRepository memberRepository;
	private final RegisterMail registerMail;

	private static final String DEFAULT_IMAGE_URL="https://aucation-bucket.s3.ap-northeast-2.amazonaws.com/profile/bear.jpggi";

	@Transactional
	public void signup(SignupRequest signupRequest) {
		validateMemberId(signupRequest.getMemberId());
		validateMemberEmail(signupRequest.getMemberEmail());
		Member member = Member.builder()
			.memberId(signupRequest.getMemberId())
			.memberPw(passwordEncoder.encode(signupRequest.getMemberPw()))
			.memberEmail(signupRequest.getMemberEmail())
			.memberNickname(signupRequest.getMemberNickname())
			.memberRole(Role.COMMON)
			.imageURL(DEFAULT_IMAGE_URL)
			.socialType(SocialType.NORMAL)
			.build();
		memberRepository.save(member);
	}

	@Transactional
	public MypageResponse mypage(Long memberPk,MemberPageRequest memberPageRequest) {
		Member member = existsMemberPk(memberPk);
		return memberRepository.searchMyAuctionPage(member,memberPageRequest);
	}

	public EmailResponse verifyemail(String memberEmail) throws Exception {
		validateMemberEmail(memberEmail);
		String code = registerMail.sendSimpleMessage(memberEmail,"회원가입");
		return EmailResponse.of(code);

	}

	public void verifynick(String memberNickname) {
		if(memberRepository.existsByMemberNickname(memberNickname)) {
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

	private Member existsMemberPk(Long memberPk) {
		return memberRepository.findById(memberPk).orElseThrow(() -> new NotFoundException(ApplicationError.MEMBER_NOT_FOUND));
	}
}
