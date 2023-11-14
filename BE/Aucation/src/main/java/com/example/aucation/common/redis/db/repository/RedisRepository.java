package com.example.aucation.common.redis.db.repository;

import java.util.Optional;

import javax.annotation.Resource;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class RedisRepository {

	public static final String USER_COUNT = "USER_COUNT";
	public static final String ENTER_INFO = "ENTER_IFNO";

	@Resource(name="redisTemplate")
	private HashOperations<String,String,String> hashOperations;

	@Resource(name="redisTemplate")
	private ValueOperations<String,String> valueOps;

	public void setUserEnterInfo(String sessionId,String roomId){
		hashOperations.put(ENTER_INFO,sessionId,roomId);
	}

	public long plusUserCount(String roomId){
		return Optional.ofNullable(valueOps.increment(USER_COUNT+ "_"+roomId)).orElse(0L);
	}

	public Long minusUserCount(String auctionUUID) {
		return Optional.ofNullable(valueOps.decrement(USER_COUNT+"_"+auctionUUID)).filter(count -> count >0).orElse(0L);
	}

	public void removeUserEnterInfo(String sessionId) {
		hashOperations.delete(ENTER_INFO, sessionId);
	}

	public long getUserCount(String auctionUUID){
		return Long.valueOf(Optional.ofNullable(valueOps.get(USER_COUNT+"_"+auctionUUID)).orElse("0"));
	}
}
