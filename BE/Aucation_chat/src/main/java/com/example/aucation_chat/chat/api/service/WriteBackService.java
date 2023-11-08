package com.example.aucation_chat.chat.api.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.example.aucation_chat.chat.db.repository.group.GroupChatWriteBackRepository;
import com.example.aucation_chat.chat.db.repository.personal.ChatWriteBackRepository;
import com.example.aucation_chat.common.redis.dto.RedisChatMessage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j

public class WriteBackService {

	@Autowired
	private GroupChatWriteBackRepository groupChatWriteBackRepository;
	@Autowired
	private ChatWriteBackRepository chatWriteBackRepository;
	private final RedisTemplate<String, RedisChatMessage> redisTemplate;

	@Transactional
	public void writeBackAuc(String redisKeyBase, String uuid) {
		List<RedisChatMessage> chatList = redisTemplate.opsForList().range(redisKeyBase+":"+uuid, 0, -1);
		groupChatWriteBackRepository.saveAll(chatList);
	}

	@Transactional
	public void writeBackElse(String redisKeyBase, String uuid) {
	}

}
