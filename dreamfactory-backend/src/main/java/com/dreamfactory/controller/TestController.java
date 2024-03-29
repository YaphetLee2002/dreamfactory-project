package com.dreamfactory.controller;

import com.alibaba.fastjson2.JSONObject;
import com.dreamfactory.entity.RestBean;
import com.dreamfactory.service.AccountService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Resource
    private AccountService accountService;

    @GetMapping("/hello")
    public String test() {
        return "Hello World!";
    }

    @GetMapping("/username")
    public String getUsername(@RequestAttribute("id") String id) {
        return RestBean.success(accountService.getById(id).getUsername()).asJsonString();
    }
}
