package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Result;
import com.welfare.entity.Staff;
import com.welfare.entity.User;
import com.welfare.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/staff")
@CrossOrigin //允许跨域请求
public class StaffController {
    @Autowired
    private StaffService staffService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    /**
     * 登录
     * @param staff
     * @return
     */
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    @ResponseBody
    public String login (@RequestBody Staff staff) {
        // 检查账号,密码
        Map<String, Object> map = staffService.login(staff.getStaffid(), staff.getPassword());
        return JSON.toJSONString(map);
    }

    /**
     * 注册
     * @param staff
     * @return
     */
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register (@RequestBody Staff staff) {
        Map<String, Object> map = staffService.register(staff);
        return JSON.toJSONString(map);
    }

    /**
     * 修改职工信息(id)
     * @param staff
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Staff staff){
        int i = staffService.updateById(staff);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 插入职工信息(id)
     * @param staff
     * @return
     */
    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Staff staff){
        Staff insert =staffService.insert(staff);
        return JSON.toJSONString(insert);
    }

    /**
     * 修改职工信息(name)
     * @param staff
     * @return
     */
    @RequestMapping(path = "/updateByName", method = RequestMethod.POST)
    @ResponseBody
    public String updateByName(@RequestBody Staff staff){
        int i = staffService.updateByName(staff);
        return JSON.toJSONString(new Result(i>0));
    }


    /**
     * 职工列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<Staff> list = staffService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 删除职工
     * @param staff
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Staff staff){
        int i = staffService.deleteById(staff.getStaffid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param staff
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Staff staff){
        Staff record = staffService.selectById(staff.getStaffid());
        return JSON.toJSONString(record);
    }

    /**
     * 模糊查询
     * @param book  模糊查询
     * @return
     */
    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondition(@RequestBody Staff book){
        List<Staff> byCondition = staffService.findByCondition(book);
        return JSON.toJSONString(byCondition);
    }
}
