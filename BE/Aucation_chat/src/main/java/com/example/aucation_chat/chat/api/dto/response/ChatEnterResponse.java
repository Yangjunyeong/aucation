package com.example.aucation_chat.chat.api.dto.response;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class ChatEnterResponse {
	long sellerPk; //판매자
	String sellerNickName; //판매자 닉네임
	String sellerImageURL; // 판매자 프사
	String prodName; // 제목
	String prodType; // ex) 역경매
	String prodCategory; // ex) 전자기기
	int prodEndPrice; // 낙찰가, 할인가
	String chatUUID; // 채팅방 UUID
	List<ChatResponse> chatList;
}
