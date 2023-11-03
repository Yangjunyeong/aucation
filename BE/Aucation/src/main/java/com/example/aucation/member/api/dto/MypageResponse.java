package com.example.aucation.member.api.dto;

import com.example.aucation.member.db.entity.Member;

public class MypageResponse {
	public static MypageResponse of(Member member) {
		return new MypageResponse();
	}
}
