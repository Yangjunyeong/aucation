package com.example.aucation_chat.chat.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

// memberPk : long,  // 상대방 PK
// 	myMemberPk : long // 입장하는사람 Pk
// 	prodPk: long, // 물품PK
// 	prodType: int,   // 숫자로 판매유형 알아낼것임 => 1:경매, 2:역경매, 3: 할인
public class ChatEnterRequest {
	long memberPk; //상대방 PK
	long myMemberPk; // 입장하는사람 Pk
	long prodPk; // 물품 Pk
	int prodType; // 판매유형
}

