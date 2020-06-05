package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Recruit;
import com.welfare.entity.RecruitKey;
import com.welfare.entity.Result;
import com.welfare.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/recruit")
@CrossOrigin //允许跨域请求
public class RecruitController {
    @Autowired
    private RecruitService recruitService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    /**
     * 修改信息(id)
     * @param recruit
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Recruit recruit){
        int i = recruitService.updateById(recruit);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 活动列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<Recruit> list = recruitService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 活动列表（审核中）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll1", method = RequestMethod.POST)
    @ResponseBody
    public String findAll1(){
        List<Recruit> list = recruitService.selectAll1();
        return JSON.toJSONString(list);
    }

    /**
     * 活动列表（招聘中）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll2", method = RequestMethod.POST)
    @ResponseBody
    public String findAll2(){
        List<Recruit> list = recruitService.selectAll2();
        return JSON.toJSONString(list);
    }

    /**
     * 活动列表（已完成）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll3", method = RequestMethod.POST)
    @ResponseBody
    public String findAll3(){
        List<Recruit> list = recruitService.selectAll3();
        return JSON.toJSONString(list);
    }


    /**
     * 删除活动
     * @param recruit
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Recruit recruit){
        int i = recruitService.deleteById(recruit.getRecruitid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param recruit
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Recruit recruit){
        Recruit record = recruitService.selectById(recruit.getRecruitid());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param recruit
     * @return
     */
    @RequestMapping(path = "/findByUId", method = RequestMethod.POST)
    @ResponseBody
    public String findByUId(@RequestBody Recruit recruit){
        List<Recruit> list= recruitService.selectByUId(recruit.getUserid());
        return JSON.toJSONString(list);
    }

    /**
     * 查询单个
     * @param key
     * @return
     */
    @RequestMapping(path = "/find", method = RequestMethod.POST)
    @ResponseBody
    public String apply(@RequestBody RecruitKey key){
        Recruit list= recruitService.apply(key);
        return JSON.toJSONString(list);
    }

    /**
     * 注册
     * @param user
     * @return
     */
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register (@RequestBody Recruit user) {
        Map<String, Object> map = recruitService.register(user);
        return JSON.toJSONString(map);
    }

    /**
     * 注册
     * @param user
     * @return
     */
    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondition (@RequestBody Recruit user) {
        List<Recruit> map = recruitService.findByCondition(user);
        return JSON.toJSONString(map);
    }

    /**
     * 注册
     * @param userid
     * @return
     */
    @RequestMapping(path = "/activityNum", method = RequestMethod.POST)
    @ResponseBody
    public String activityNum (@RequestBody Recruit userid) {
        int map = recruitService.activityNum(userid);
        return JSON.toJSONString(map);
    }

    /**
     * 注册
     * @param user
     * @return
     */
    @RequestMapping(path = "/socialNum", method = RequestMethod.POST)
    @ResponseBody
    public String socialNum (@RequestBody Recruit user) {
        int map = recruitService.socialNum(user);
        return JSON.toJSONString(map);
    }
}
