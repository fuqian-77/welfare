package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Activity;
import com.welfare.entity.Result;
import com.welfare.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/activity")
@CrossOrigin //允许跨域请求
public class ActivityController {
    @Autowired
    private ActivityService activityService;

    @Value("${server.servlet.context-path}")
    private String contextPath;



    /**
     * 修改活动信息(id)
     * @param activity
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Activity activity){
        int i = activityService.updateById(activity);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 活动列表（quanbu）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<Activity> list = activityService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 活动列表（已审核）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll1", method = RequestMethod.POST)
    @ResponseBody
    public String findAll1(){
        List<Activity> list = activityService.selectAll1();
        return JSON.toJSONString(list);
    }

    /**
     * 活动列表（wei审核）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll2", method = RequestMethod.POST)
    @ResponseBody
    public String findAll2(){
        List<Activity> list = activityService.selectAll2();
        return JSON.toJSONString(list);
    }

    /**
     * 活动列表（wei审核）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll3", method = RequestMethod.POST)
    @ResponseBody
    public String findAll3(){
        List<Activity> list = activityService.selectAll3();
        return JSON.toJSONString(list);
    }

    /**
     * 活动列表（wei审核）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll4", method = RequestMethod.POST)
    @ResponseBody
    public String findAll4(){
        List<Activity> list = activityService.selectAll4();
        return JSON.toJSONString(list);
    }
    /**
     * 删除活动
     * @param activity
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Integer activity){
        int i = activityService.deleteById(activity);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param activity
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Integer activity){
        Activity record = activityService.selectById(activity);
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param activity
     * @return
     */
    @RequestMapping(path = "/findByUId", method = RequestMethod.POST)
    @ResponseBody
    public String findByUId(@RequestBody Activity activity){
        List<Activity> record = activityService.selectByUId(activity);
        return JSON.toJSONString(record);
    }

    /**
     * 插入职工信息(id)
     * @param leave
     * @return
     */
    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Activity leave){
        Activity insert =activityService.insert(leave);
        return JSON.toJSONString(insert);
    }
}
