package com.welfare.controller;

import com.welfare.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class AdminController {

        @Autowired
        private StaffService staffService;

//        前台页面
        @RequestMapping("/userlogin")
    public String test() {
        return "userlogin";
    }
    @RequestMapping("/register")
    public String test33() {
        return "register";
    }
    @RequestMapping("/personal")
    public String test34() {
        return "personal";
    }
    @RequestMapping("/apply")
    public String test35() {
        return "apply";
    }
    @RequestMapping("/foster")
    public String test36() {
        return "foster";
    }


    @RequestMapping("/index")
    public String test1() {
        return "/index";
    }
    @RequestMapping("/about")
    public String test27() {
        return "/about";
    }
    @RequestMapping("/news")
    public String test28() {
        return "/news";
    }
    @RequestMapping("/products")
    public String test29() {
        return "/products";
    }
    @RequestMapping("/profuile")
    public String test30() {
        return "/profuile";
    }
    @RequestMapping("/join")
    public String test31() {
        return "/join";
    }
    @RequestMapping("/activity")
    public String test48() {
        return "/activity";
    }
//    后台
    @RequestMapping("/login")
    public String test32() {
        return "login";
    }
   //院长办公室系统
    @RequestMapping("/admin")
    public String test2() {
        return "admin/admin";
    }

    @RequestMapping("/admin/department")
    public String test9() {
        return "admin/department";
    }
    @RequestMapping("/admin/check")
    public String test10() {
        return "admin/check";
    }
    @RequestMapping("/admin/total")
    public String test11() {
        return "admin/total";
    }
    @RequestMapping("/admin/contract")
    public String test40() {
        return "admin/contract";
    }

//    护理部门系统
    @RequestMapping("/nurse")
    public String test3() {
        return "nurse/nurse";
    }
    @RequestMapping("/nurse/basemessage")
    public String test12() {
        return "nurse/basemessage";
    }
    @RequestMapping("/nurse/message")
    public String test13() {
        return "nurse/message";
    }
    @RequestMapping("/nurse/growmessage")
    public String test14() {
        return "nurse/growmessage";
    }
    @RequestMapping("/nurse/leavemessage")
    public String test21() {
        return "nurse/leavemessage";
    }
    @RequestMapping("/nurse/contract")
    public String test41() {
        return "nurse/contract";
    }

//    社工部门系统
    @RequestMapping("/social")
    public String test7() {
        return "social/social";
    }
    @RequestMapping("/social/information")
    public String test18() {
        return "social/information";
    }
    @RequestMapping("/social/visitor")
    public String test19() {
        return "social/visitor";
    }
    @RequestMapping("/social/user")
    public String test20() {
        return "social/user";
    }
    @RequestMapping("/social/new")
    public String test37() {
        return "social/new";
    }
    @RequestMapping("/social/newup")
    public String test38() {
        return "social/newup";
    }
    @RequestMapping("/social/contract")
    public String test42() {
        return "social/contract";
    }
    @RequestMapping("/social/activity")
    public String test47() {
        return "social/activity";
    }
//    寄养部门系统
    @RequestMapping("/fosterage")
    public String test8() {
        return "fosterage/fosterage";
    }
    @RequestMapping("/fosterage/apply")
    public String test15() {
        return "fosterage/apply";
    }
    @RequestMapping("/fosterage/contract")
    public String test16() {
        return "fosterage/contract";
    }
    @RequestMapping("/fosterage/back")
    public String test17() {
        return "fosterage/back";
    }

//    医护部门
    @RequestMapping("/health")
    public String test5() {
        return "health/health";
    }

    @RequestMapping("/health/doctor")
    public String test24() {
        return "health/doctor";
    }

    @RequestMapping("/health/nursing")
    public String test23() {
        return "health/nursing";
    }

    @RequestMapping("/health/drug")
    public String test25() {
        return "health/drug";
    }
    @RequestMapping("/health/contract")
    public String test45() {
        return "health/contract";
    }

//    教育部门
    @RequestMapping("/education")
    public String test6() {
        return "education/education";
    }

    @RequestMapping("/education/external")
    public String test26() {
        return "education/external";
    }
    @RequestMapping("/education/contract")
    public String test46() {
        return "education/contract";
    }

}

