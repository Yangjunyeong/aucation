package com.example.aucation_chat.common.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.example.aucation_chat.chat.db.entity.ChatMessage;

import io.lettuce.core.ReadFrom;

@Configuration

public class RedisConfig {
	// @Value("${spring.redis.host}")
	// private String host;
	//
	// @Value("${spring.redis.port}")
	// private int port;
	//
	// @Value("${spring.redis.password}")
	// private String password;

	@Value("${spring.redis.cluster.nodes}")
	private List<String> clusterNodes;

	@Bean
	public RedisConnectionFactory redisConnectionFactory() {
		LettuceClientConfiguration clientConfiguration = LettuceClientConfiguration.builder()
			.readFrom(ReadFrom.REPLICA_PREFERRED) // 복제본 노드에서 읽지만 사용할 수없는 경우 마스터에서 읽습니다.
			.build();

		// 모든 클러스터 노드들 정보를 넣는다.
		RedisClusterConfiguration redisClusterConfiguration = new RedisClusterConfiguration(clusterNodes);
		return new LettuceConnectionFactory(redisClusterConfiguration, clientConfiguration);
	}

	@Bean
	public RedisTemplate<String, ChatMessage> redisTemplate() {
		RedisTemplate<String, ChatMessage> redisTemplate = new RedisTemplate<>();

		redisTemplate.setConnectionFactory(redisConnectionFactory());

		// StringRedisSerializer: binary 데이터로 저장되기 때문에 이를 String 으로 변환시켜주며(반대로도 가능) UTF-8 인코딩 방식을 사용
		// GenericJackson2JsonRedisSerializer: 객체를 json 타입으로 직렬화/역직렬화를 수행
		redisTemplate.setKeySerializer(new StringRedisSerializer());
		redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(ChatMessage.class));

		return redisTemplate;
	}
}
