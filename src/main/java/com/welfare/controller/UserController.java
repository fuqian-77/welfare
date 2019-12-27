package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Result;
import com.welfare.entity.User;
import com.welfare.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/user")
@CrossOrigin //允许跨域请求
public class UserController {

    @Autowired
    private UserService userService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    /**
     * 用户列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<User> list = userService.selectAll();
        return JSON.toJSONString(list);
    }

}
