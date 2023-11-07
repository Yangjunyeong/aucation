package com.example.aucation_chat.common.redis.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class RedisChatMessage {
	private long memberPk; // 보낸사람 Pk
	private String memberNickname; // 보낸사람 닉네임
	private String messageContent; // 보낸 내용
	private String imageURL;  // 보낸사람 프사 URL
	private String messageTime;  // 보낸시간
	private boolean cachedFromDB; // MySQL 갔다온건지 확인

	@Builder
	public RedisChatMessage(long memberPk, String memberNickname, String messageContent, String imageURL,
		String messageTime, boolean cachedFromDB) {
		this.memberPk = memberPk;
		this.memberNickname = memberNickname;
		this.messageContent = messageContent;
		this.imageURL = imageURL;
		this.messageTime = messageTime;
		this.cachedFromDB = cachedFromDB;
	}
}
