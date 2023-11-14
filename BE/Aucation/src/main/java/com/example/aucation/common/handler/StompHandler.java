package com.example.aucation.common.handler;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class StompHandler implements ChannelInterceptor {

	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		if (StompCommand.SUBSCRIBE == accessor.getCommand()) {
			String auctionUUID = String.valueOf(message.getPayload());
			log.info(auctionUUID);
		}else if(StompCommand.DISCONNECT == accessor.getCommand()){
			String auctionUUID = String.valueOf(message.getPayload());
			log.info(auctionUUID);
		}

		return message;
	}
}
