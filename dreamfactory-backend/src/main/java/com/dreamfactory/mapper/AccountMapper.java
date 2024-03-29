package com.dreamfactory.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.dreamfactory.entity.dto.Account;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AccountMapper extends BaseMapper<Account> {
}
