package com.example.aucation_chat.chat.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
/** 채팅방에 보낼 내용 */
public class ChatRequest {  
	private String sender;
	private String content;
}



