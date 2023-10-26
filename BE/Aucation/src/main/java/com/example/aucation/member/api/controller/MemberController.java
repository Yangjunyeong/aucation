package com.example.aucation.member.api.controller;

import java.nio.file.attribute.UserPrincipal;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.aucation.common.dto.EmailResponse;
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
	public ResponseEntity<Void> signup(Authentication authentication, @RequestBody SignupRequest signupRequest) {
		memberService.signup(signupRequest);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/verification/email/{email}")
	public ResponseEntity<EmailResponse> verifyemail(@PathVariable("email") String memberEmial) throws Exception {
		return ResponseEntity.ok().body(memberService.verifyemail(memberEmial));
	}

	@GetMapping("/verification/nickname/{nickname}")
	public ResponseEntity<Void> verifynick(@PathVariable("nickname") String memberNickname) {
		memberService.verifynick(memberNickname);
		return ResponseEntity.ok().build();
	}

	@GetMapping("/test")
	public ResponseEntity<Void> test(Authentication authentication){
		log.info(String.valueOf(authentication.getPrincipal()));
		return ResponseEntity.ok().build();
	}
}
