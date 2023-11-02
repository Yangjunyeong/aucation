package com.example.aucation.member.api.controller;

import com.example.aucation.member.api.dto.MemberEmailRequest;
import com.example.aucation.member.api.dto.MemberNickRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.aucation.common.dto.EmailResponse;
import com.example.aucation.common.support.AuthorizedVariable;
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

	@PostMapping("/verification/email")
	public ResponseEntity<EmailResponse> verifyemail(@RequestBody MemberEmailRequest memberEmail) throws Exception {
		return ResponseEntity.ok().body(memberService.verifyemail(memberEmail.getMemberEmail()));
	}

	@PostMapping("/verification/nickname")
	public ResponseEntity<Void> verifynick(@RequestBody MemberNickRequest memberNickname) {
		memberService.verifynick(memberNickname.getMemberNickname());
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

	@GetMapping("/mypage")
	public ResponseEntity<MypageResponse> mypage(@AuthorizedVariable Long memberPk) {
		return ResponseEntity.ok().body(memberService.mypage(memberPk));
	}
}
