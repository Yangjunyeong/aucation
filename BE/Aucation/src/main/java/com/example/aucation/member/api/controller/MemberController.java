package com.example.aucation.member.api.controller;

import com.example.aucation.member.api.dto.MemberEmailRequest;
import com.example.aucation.member.api.dto.MemberNickRequest;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.aucation.common.dto.EmailResponse;
import com.example.aucation.common.support.AuthorizedVariable;
import com.example.aucation.member.api.dto.MemberPageRequest;
import com.example.aucation.member.api.dto.MypageLikeResponse;
import com.example.aucation.member.api.dto.MypageResponse;
import com.example.aucation.member.api.dto.SignupRequest;
import com.example.aucation.member.api.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/members")
@Slf4j
public class MemberController {

	private final MemberService memberService;

	@PostMapping("/signup")
	public ResponseEntity<Void> signup(@RequestBody SignupRequest signupRequest) {
		memberService.signup(signupRequest);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/certification/email/{email}")
	public ResponseEntity<EmailResponse> cerifyemail(@PathVariable("email") String memberEmail) throws Exception {
		return ResponseEntity.ok().body(memberService.cerifyemail(memberEmail));
	}

	@GetMapping("/verification/id/{memberId}")
	public ResponseEntity<Void> verifyId(@PathVariable("memberId") String memberId) throws Exception {
		memberService.verifyId(memberId);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/verification/nickname/{nickname}")
	public ResponseEntity<Void> verifynick(@PathVariable("nickname") String memberNickname) {
		memberService.verifynick(memberNickname);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/verification/email/{email}")
	public ResponseEntity<Void> verifyemail(@PathVariable("email") String memberEmail) throws Exception {
		memberService.verifynick(memberEmail);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/test")
	public ResponseEntity<Void> test(@AuthorizedVariable Long memberPk) {
		log.info(String.valueOf(memberPk));
		return ResponseEntity.ok().build();
	}

	//마이페이지
	@PostMapping("/mypage")
	public ResponseEntity<MypageResponse> mypage(@AuthorizedVariable Long memberPk, @RequestBody MemberPageRequest memberPageRequest) {
		return ResponseEntity.ok().body(memberService.mypage(memberPk,memberPageRequest));
	}

	//마이페이지 좋아요 게시글
	@PostMapping("/mypage/like")
	public ResponseEntity<MypageLikeResponse> mypageLike(@AuthorizedVariable Long memberPk) {
		return ResponseEntity.ok().body(memberService.mypageLike(memberPk));
	}

	//마이페이지 할인 게시글
}
