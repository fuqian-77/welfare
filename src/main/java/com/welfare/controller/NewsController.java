package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.News;
import com.welfare.entity.Result;
import com.welfare.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/news")
@CrossOrigin //允许跨域请求
public class NewsController {
    @Autowired
    private NewsService childrenService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    /**
     * 插入职工信息(id)
     * @param leave
     * @return
     */
    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody News leave){
        News insert =childrenService.insert(leave);
        return JSON.toJSONString(insert);
    }

    /**
     * 修改活动信息(id)
     * @param children
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody News children){
        int i = childrenService.updateById(children);
        return JSON.toJSONString(new Result(i>0));
    }

    @RequestMapping(path = "/updateByTitle", method = RequestMethod.POST)
    @ResponseBody
    public String updateByName(@RequestBody News children){
        int i = childrenService.updateByTitle(children);
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
        List<News> list = childrenService.selectAll();
        return JSON.toJSONString(list);
    }
    /**
     * 删除活动
     * @param children
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody News children){
        int i = childrenService.deleteById(children.getNewid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param children
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody News children){
        News record = childrenService.selectById(children.getNewid());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param children
     * @return
     */
    @RequestMapping(path = "/findByTitle", method = RequestMethod.POST)
    @ResponseBody
    public String findByName(@RequestBody News children){
        News record = childrenService.selectByTitle(children.getTitle());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param children
     * @return
     */
    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondition(@RequestBody News children){
        List<News> record = childrenService.findByCondition(children);
        return JSON.toJSONString(record);
    }
}
