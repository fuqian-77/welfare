package com.welfare.controller;

import com.welfare.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class AdminController {

        @Autowired
        private UserService userService;

        @RequestMapping("/login")
        public String test1() {
            return "login";
        }
    @RequestMapping("/index")
    public String test() {
        return "index";
    }
    }

