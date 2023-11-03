package com.example.aucation_chat.common.redis.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@NoArgsConstructor
@RequiredArgsConstructor
public class RedisChatMessage {
	private long memberPk; // 보낸사람 Pk
	private String memberNickname; // 보낸사람 닉네임
	private String messageContnet; // 보낸 내용
	private String imageURL;  // 보낸사람 프사 URL
	private String messageTime;  // 보낸시간

	@Builder
	public RedisChatMessage(long memberPk, String memberNickname, String messageContnet, String imageURL,
		String messageTime) {
		this.memberPk = memberPk;
		this.memberNickname = memberNickname;
		this.messageContnet = messageContnet;
		this.imageURL = imageURL;
		this.messageTime = messageTime;
	}
}
