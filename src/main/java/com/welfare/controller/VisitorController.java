package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Result;
import com.welfare.entity.VisitResult;
import com.welfare.entity.Visitor;
import com.welfare.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/visitor")
@CrossOrigin //允许跨域请求
public class VisitorController {

    @Autowired
    private VisitorService visitorService;

    @Value("${server.servlet.context-path}")
    private String contextPath;


    /**
     * 验证
     * @param visitor
     * @return
     */
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register (@RequestBody Visitor visitor) {
        Map<String, Object> map = visitorService.register(visitor);
        return JSON.toJSONString(map);
    }

    /**
     * 修改信息(id)
     * @param visitor
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Visitor visitor){
        int i = visitorService.updateById(visitor);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 拜访列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<Visitor> list = visitorService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 删除拜访记录
     * @param visitor
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Visitor visitor){
        int i = visitorService.deleteById(visitor.getVisitorid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单条
     * @param visitor
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Visitor visitor){
        Visitor record = visitorService.selectById(visitor.getVisitorid());
        return JSON.toJSONString(record);
    }

    /**
     * search
     * @param visitor
     * @return
     */
    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondition(@RequestBody Visitor visitor){
        List<Visitor> record = visitorService.findByCondition(visitor);
        return JSON.toJSONString(record);
    }

    /**
     * 拜访次数
     * @param visitor
     * @return
     */
    @RequestMapping(path = "/visitNum", method = RequestMethod.POST)
    @ResponseBody
    public String visitNum(@RequestBody Visitor visitor){
        int record = visitorService.visitNum(visitor);
        return JSON.toJSONString(record);
    }

    /**
     * 拜访次数
     * @param visitor
     * @return
     */
    @RequestMapping(path = "/childrenNum", method = RequestMethod.POST)
    @ResponseBody
    public String childrenNum(@RequestBody Visitor visitor){
        List<VisitResult> record = visitorService.childrenNum(visitor);
        return JSON.toJSONString(record);
    }
}
