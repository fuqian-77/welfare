package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Reject;
import com.welfare.entity.RejectKey;
import com.welfare.entity.Result;
import com.welfare.service.RejectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/reject")
@CrossOrigin //允许跨域请求
public class RejectController {
    @Autowired
    private RejectService rejectService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    /**
     * 修改信息(id)
     * @param reject
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Reject reject){
        int i = rejectService.updateById(reject);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 活动列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAlla", method = RequestMethod.POST)
    @ResponseBody
    public String findAlla(){
        List<Reject> list = rejectService.selectAlla();
        return JSON.toJSONString(list);
    }
    /**
     * 活动列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAllr", method = RequestMethod.POST)
    @ResponseBody
    public String findAllr(){
        List<Reject> list = rejectService.selectAllr();
        return JSON.toJSONString(list);
    }

    /**
     * 删除活动
     * @param reject
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Reject reject){
        int i = rejectService.deleteById(reject.getRejectid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param reject
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Reject reject){
        Reject record = rejectService.selectById(reject.getRejectid());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param userid
     * @return
     */
    @RequestMapping(path = "/selectr", method = RequestMethod.POST)
    @ResponseBody
    public String selectr(@RequestBody RejectKey userid){
        Reject record = rejectService.selectr(userid);
        return JSON.toJSONString(record);
    }

    /**
     * 添加列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Reject reject){
       Reject insert = rejectService.insert(reject);
        return JSON.toJSONString(insert);
    }
}



