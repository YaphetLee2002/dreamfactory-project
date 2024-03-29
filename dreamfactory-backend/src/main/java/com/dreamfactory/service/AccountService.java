package com.dreamfactory.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.dreamfactory.entity.dto.Account;
import com.dreamfactory.entity.vo.request.EmailRegisterVO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface AccountService extends IService<Account>, UserDetailsService {
    public Account findAccountByUsernameOrEmail(String text);
    String registerEmailVerifyCode(String type, String email, String ip);
    String registerEmailAccount(EmailRegisterVO vo);
}
