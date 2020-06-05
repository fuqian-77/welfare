package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Activity;
import com.welfare.entity.Children;
import com.welfare.entity.Result;
import com.welfare.service.ActivityService;
import com.welfare.service.ChildrenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/children")
@CrossOrigin //允许跨域请求
public class ChildrenController {
    @Autowired
    private ChildrenService childrenService;

    @Value("${server.servlet.context-path}")
    private String contextPath;


    /**
     * 注册
     * @param children
     * @return
     */
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register (@RequestBody Children children) {
        Map<String, Object> map = childrenService.register(children);
        return JSON.toJSONString(map);
    }
    /**
     * 修改活动信息(id)
     * @param children
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Children children){
        int i = childrenService.updateById(children);
        return JSON.toJSONString(new Result(i>0));
    }

    @RequestMapping(path = "/updateByName", method = RequestMethod.POST)
    @ResponseBody
    public String updateByName(@RequestBody Children children){
        int i = childrenService.updateByName(children);
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
        List<Children> list = childrenService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 活动列表（zaiyuan）
     * @param
     * @return
     */
    @RequestMapping(path = "/findIn", method = RequestMethod.POST)
    @ResponseBody
    public String findIn(){
        List<Children> list = childrenService.selectIn();
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
        List<Children> list = childrenService.selectAll1();
        return JSON.toJSONString(list);
    }

    /**
     * 活动列表（未审核）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll2", method = RequestMethod.POST)
    @ResponseBody
    public String findAll2(){
        List<Children> list = childrenService.selectAll2();
        return JSON.toJSONString(list);
    }


    /**
     * 删除活动
     * @param children
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Children children){
        int i = childrenService.deleteById(children.getChildrenid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param children
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Children children){
        Children record = childrenService.selectById(children.getChildrenid());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param children
     * @return
     */
    @RequestMapping(path = "/findByName", method = RequestMethod.POST)
    @ResponseBody
    public String findByName(@RequestBody Children children){
        Children record = childrenService.selectByName(children.getName());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param children
     * @return
     */
    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondition(@RequestBody Children children){
        List<Children> record = childrenService.findByCondition(children);
        return JSON.toJSONString(record);
    }
}
