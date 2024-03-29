package com.dreamfactory.utils;

import jakarta.annotation.Resource;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

/**
 * 限流工具，防止频繁请求验证码
 */
@Component
public class FlowUtils {

    @Resource
    StringRedisTemplate stringRedisTemplate;
    public boolean limitOnceCheck(String key, int blockTime) {
        if (Boolean.TRUE.equals(stringRedisTemplate.hasKey(key))) {
            return false;
        } else {
            // 封禁标识
            stringRedisTemplate.opsForValue()
                    .set(key, "", blockTime, TimeUnit.SECONDS);
            return true;
        }
    }
}
