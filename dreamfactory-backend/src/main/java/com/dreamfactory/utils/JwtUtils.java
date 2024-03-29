package com.dreamfactory.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtils {

    @Value("${spring.security.jwt.key}")
    String key;
    @Value("${spring.security.jwt.expire}")
    int expire;

    @Resource
    StringRedisTemplate template;

    /**
     * 通过调用deleteToken使一个Jwt令牌失效
     * @param headerToken 要失效的token
     * @return 执行结果
     */
    public boolean invalidateJwt(String headerToken) {
        String token = this.convertToken(headerToken);
        if (token == null) return false;
        Algorithm algorithm = Algorithm.HMAC256(key);
        JWTVerifier jwtVerifier = JWT.require(algorithm).build();
        try {
            DecodedJWT jwt = jwtVerifier.verify(token);
            String id = jwt.getId();
            return deleteToken(id, jwt.getExpiresAt());
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    /**
     * 删除token
     * @param uuid 令牌的uuid
     * @param expireTime 令牌的到期时间
     * @return 执行结果
     */
    private boolean deleteToken(String uuid, Date expireTime) {
        if (this.isInvalidToken(uuid)) return false;
        Date now = new Date();
        // 计算令牌的过期时间
        long expire = Math.max(expireTime.getTime() - now.getTime(), 0);
        // 将令牌加入Redis维护的黑名单
        template.opsForValue().set(Const.JWT_BLACK_LIST + uuid, "", expire, TimeUnit.MILLISECONDS);
        return true;
    }

    /**
     * 判断token是否在黑名单中
     * @param uuid 令牌的uuid
     * @return 是否在黑名单中
     */
    private boolean isInvalidToken(String uuid) {
        return Boolean.TRUE.equals(template.hasKey(Const.JWT_BLACK_LIST + uuid));
    }

    /**
     * 创建Jwt令牌
     * @return JWT令牌
     */
    public String createJwt(UserDetails details, int id, String username) {
        Algorithm algorithm = Algorithm.HMAC256(key);
        Date expire = this.expireTime();
        // 每个令牌携带一个随机的uuid，以便后续进行令牌的拉黑处理
        return JWT.create()
                .withJWTId(UUID.randomUUID().toString())
                .withClaim("id", id)
                .withClaim("name", username)
                .withClaim("authorities", details.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .withExpiresAt(expire)
                .withIssuedAt(new Date())
                .sign(algorithm);
    }

    /**
     * 计算过期时间
     * @return 过期时间
     */
    public Date expireTime() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.HOUR, expire * 24);
        return calendar.getTime();
    }

    /**
     * 解析Jwt
     * @return 解析的Jwt token
     */
    public DecodedJWT resolveJwt(String headerToken) {
        String token = this.convertToken(headerToken);
        if (token == null) return null;
        Algorithm algorithm = Algorithm.HMAC256(key);
        JWTVerifier jwtVerifier = JWT.require(algorithm).build();
        // 检验token有没有异常
        try {
            DecodedJWT verify = jwtVerifier.verify(token);
            // 判断令牌是否在黑名单中
            if (this.isInvalidToken(verify.getId())) return null;
            // 判断令牌是否过期，未过期则返回解析出的Jwt令牌
            Date expiresAt = verify.getExpiresAt();
            return new Date().after(expiresAt) ? null : verify;
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    /**
     * 检查token有效性
     * @param headerToken Header中携带的Token
     * @return 返回切割好的token
     */
    private String convertToken(String headerToken) {
        if (headerToken == null || !headerToken.startsWith("Bearer "))
            return null;
        return headerToken.substring(7);
    }

    /**
     * 解析jwt中的userDetails
     * @param jwt jwt令牌信息
     * @return userDetails信息
     */
    public UserDetails toUser(DecodedJWT jwt) {
        Map<String, Claim> claimMap = jwt.getClaims();
        return User
                .withUsername(claimMap.get("name").asString())
                .password("******")
                .authorities(claimMap.get("authorities").asArray(String.class))
                .build();
    }

    /**
     * 从jwt中获取用户id
     * @param jwt jwt令牌信息
     * @return 用户id
     */
    public Integer toId(DecodedJWT jwt) {
        Map<String, Claim> claimMap = jwt.getClaims();
        return claimMap.get("id").asInt();
    }
}
