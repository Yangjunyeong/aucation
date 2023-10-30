package com.example.aucation_chat.chat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomContentRequest {  // 채팅방에 보낼 내용
	private String sender;
	private String content;
}



