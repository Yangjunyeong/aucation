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
		log.info(" *************** '경매장' 채팅 writeback 시작!! - writeBackAuc");
		List<RedisChatMessage> chatList = redisTemplate.opsForList().range(redisKeyBase+":"+uuid, 0, -1);
		groupChatWriteBackRepository.saveAll(chatList);
		redisTemplate.delete(redisKeyBase+":"+uuid);
	}

	@Transactional
	public void writeBackElse(String redisKeyBase, String uuid) {
		log.info(" *************** '개인' 채팅 writeback 시작!! - writeBackElse");
		List<RedisChatMessage> chatList = redisTemplate.opsForList().range(redisKeyBase+":"+uuid, 0, -1);
		chatWriteBackRepository.saveAll(chatList);
		redisTemplate.delete(redisKeyBase+":"+uuid);
	}

}
