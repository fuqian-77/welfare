package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Advice;
import com.welfare.entity.Recipel;
import com.welfare.entity.Result;
import com.welfare.service.AdviceService;
import com.welfare.service.RecipelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/recipel")
@CrossOrigin //允许跨域请求
public class RecipelController {
    @Autowired
    private RecipelService adviceService;

    @Value("${server.servlet.context-path}")
    private String contextPath;


    /**
     * 修改医嘱信息(id)
     * @param advice
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Recipel advice){
        int i = adviceService.updateById(advice);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 医嘱列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<Recipel> list = adviceService.selectAll();
        return JSON.toJSONString(list);
    }


    /**
     * 医嘱列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll1", method = RequestMethod.POST)
    @ResponseBody
    public String findAll1(){
        List<Recipel> list = adviceService.selectAll1();
        return JSON.toJSONString(list);
    }


    /**
     * 医嘱列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll2", method = RequestMethod.POST)
    @ResponseBody
    public String findAll2(){
        List<Recipel> list = adviceService.selectAll2();
        return JSON.toJSONString(list);
    }

    /**
     * 删除医嘱
     * @param advice
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Recipel advice){
        int i = adviceService.deleteById(advice.getAdviceid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param advice
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Recipel advice){
        Recipel record = adviceService.selectById(advice.getAdviceid());
        return JSON.toJSONString(record);
    }

    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Recipel advice){
        Recipel record = adviceService.insert(advice);
        return JSON.toJSONString(record);
    }
}
