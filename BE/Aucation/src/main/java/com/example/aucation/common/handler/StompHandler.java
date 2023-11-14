package com.example.aucation.common.handler;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import com.example.aucation.auction.api.dto.BIDRequest;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class StompHandler implements ChannelInterceptor {

	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		if (StompCommand.SUBSCRIBE == accessor.getCommand()) {
			log.info("accessor.getSessionId"+accessor.getSessionId());
			String destination = accessor.getDestination();
			log.info("destination"+destination);
			String[] destinationParts = destination.split("/");
			String auctionUUID = destinationParts[destinationParts.length - 1];
			log.info("AuctionUUID: " + auctionUUID);

			log.info("===========================================");

			String a = (String)message.getHeaders().get("simpDestination");
			String b = (String)message.getHeaders().get("simpSessionId");

			log.info("이제진짜인가?"+a);
			log.info("이제진짜인가????"+b);

		}else if(StompCommand.DISCONNECT == accessor.getCommand()){
			String auctionUUID = String.valueOf(message.getPayload());
			log.info(auctionUUID);
		}

		return message;
	}
}
