package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Activity;
import com.welfare.entity.Back;
import com.welfare.entity.Result;
import com.welfare.service.ActivityService;
import com.welfare.service.BackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "/back")
@CrossOrigin //允许跨域请求
public class BackController {
    @Autowired
    private BackService backService;

    @Value("${server.servlet.context-path}")
    private String contextPath;
    /**
     * 插入职工信息(id)
     * @param staff
     * @return
     */
    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Back staff){
        Back insert =backService.insert(staff);
        return JSON.toJSONString(insert);
    }


    /**
     * 修改儿童领回信息(id)
     * @param back
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Back back){
        int i = backService.updateById(back);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 领回列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<Back> list = backService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 领回列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll1", method = RequestMethod.POST)
    @ResponseBody
    public String findAll1(){
        List<Back> list = backService.selectAll1();
        return JSON.toJSONString(list);
    }
    /**
     * 领回列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll2", method = RequestMethod.POST)
    @ResponseBody
    public String findAll2(){
        List<Back> list = backService.selectAll2();
        return JSON.toJSONString(list);
    }



    /**
     * 删除领回
     * @param back
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Back back){
        int i = backService.deleteById(back.getBackid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 删除领回
     * @param back
     * @return
     */
    @RequestMapping(path = "/deleteByF", method = RequestMethod.POST)
    @ResponseBody
    public String deleteByF(@RequestBody Back back){
        int i = backService.delete(back.getFosterageid());
        return JSON.toJSONString(new Result(i>0));
    }


    /**
     * 查询单个
     * @param back
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Back back){
        Back record = backService.selectById(back.getBackid());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param back
     * @return
     */
    @RequestMapping(path = "/findByCId", method = RequestMethod.POST)
    @ResponseBody
    public String findByCId(@RequestBody Back back){
        Back record = backService.selectByCId(back.getChildrenid());
        return JSON.toJSONString(record);
    }
}
