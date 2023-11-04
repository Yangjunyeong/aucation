package com.example.aucation_chat.chat.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.aucation_chat.chat.api.dto.response.ChatResponse;
import com.example.aucation_chat.chat.api.service.ChatService;
import com.example.aucation_chat.common.redis.dto.RedisChatMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v2/chat")
public class ChatController {

	private final ChatService chatService;

	@GetMapping("/enter/{auctionUUID}")
	public ResponseEntity<List<RedisChatMessage>> enter (@PathVariable String auctionUUID) {
		List<RedisChatMessage> chatList = chatService.enter(auctionUUID);
		return ResponseEntity.ok().body(chatList);
	}


}
