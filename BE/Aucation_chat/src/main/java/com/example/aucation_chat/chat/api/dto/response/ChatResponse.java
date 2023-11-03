package com.example.aucation_chat.chat.api.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;


@NoArgsConstructor
@Getter
public class ChatResponse {
	String memberNickname;	// 보낸사람 닉네임
	String messageContent;		// 채팅 내용
	String imageURL;		// 보낸사람 프사
	String messageTime; 	// 보낸시간

	@Builder
	public ChatResponse(String memberNickname, String messageContent, String imageURL, String messageTime) {
		this.memberNickname = memberNickname;
		this.messageContent = messageContent;
		this.imageURL = imageURL;
		this.messageTime = messageTime;
	}
}
