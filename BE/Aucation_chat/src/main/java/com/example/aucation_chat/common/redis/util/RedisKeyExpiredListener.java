package com.example.aucation_chat.common.redis.util;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.listener.KeyExpirationEventMessageListener;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Component;

import com.example.aucation_chat.chat.api.service.WriteBackService;
import com.example.aucation_chat.common.redis.dto.RedisChatMessage;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class RedisKeyExpiredListener extends KeyExpirationEventMessageListener {
	/**
	 * Creates new {@link MessageListener} for {@code __keyevent@*__:expired} messages.
	 *
	 * @param listenerContainer must not be {@literal null}.
	 */
	public RedisKeyExpiredListener(RedisMessageListenerContainer listenerContainer) {
		super(listenerContainer);
	}

	@Autowired
	private WriteBackService writeBackService;

	/**
	 *
	 * @param message   redis key
	 * @param pattern   __keyevent@*__:expired
	 */
	@Override
	public void onMessage(Message message, byte[] pattern) {
		log.info("*********************** REDIS EXPIRED EVENT START !!");
		String key = message.toString();
		log.info("*********************** REDIS EXPIRED KEY = {} !!",key);

		String[] keyInfo = key.split(":");
		String UUID = keyInfo[2];
		String redisKeyBase = keyInfo[1];
		// String[] aucInfo = keyInfo[0].split("-");
		if(redisKeyBase.equals("chat-auc")){
			writeBackService.writeBackAuc(redisKeyBase, UUID);
		}else{
			writeBackService.writeBackElse(redisKeyBase, UUID);
		}
		log.info("*********************** REDIS EXPIRED EVENT END !!");
	}
}