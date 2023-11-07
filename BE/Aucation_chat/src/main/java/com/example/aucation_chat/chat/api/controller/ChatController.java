package com.example.aucation_chat.chat.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.aucation_chat.chat.api.dto.request.ChatEnterRequest;
import com.example.aucation_chat.chat.api.dto.response.ChatEnterResponse;
import com.example.aucation_chat.chat.api.dto.response.ChatResponse;
import com.example.aucation_chat.chat.api.service.ChatService;
import com.example.aucation_chat.chat.api.service.GroupChatService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v2/chat")
public class ChatController {

	private final ChatService chatService;

	// @GetMapping("/start/")

	@PostMapping("/enter/{memberPk}")
	public ResponseEntity<ChatEnterResponse> enter (@RequestBody ChatEnterRequest chatEnterRequest) {
		ChatEnterResponse chatEnterResponse = chatService.enter(chatEnterRequest);
		return ResponseEntity.ok().body(chatEnterResponse);
	}
}
