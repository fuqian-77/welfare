package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.*;
import com.welfare.service.AdviceService;
import com.welfare.service.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/treatment")
@CrossOrigin //允许跨域请求
public class TreatmentController {
    @Autowired
    private TreatmentService adviceService;

    @Value("${server.servlet.context-path}")
    private String contextPath;


    /**
     * 修改医嘱信息(id)
     * @param advice
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Treatment advice){
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
        List<Treatment> list = adviceService.selectAll();
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
        List<Treatment> list = adviceService.selectAll1();
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
        List<Treatment> list = adviceService.selectAll2();
        return JSON.toJSONString(list);
    }


    /**
     * 删除医嘱
     * @param key
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody TreatmentKey key){
        int i = adviceService.deleteById(key);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param key
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody TreatmentKey key){
        Treatment record = adviceService.selectById(key);
        return JSON.toJSONString(record);
    }


    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Treatment advice){
        Treatment record = adviceService.insert(advice);
        return JSON.toJSONString(record);
    }

    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondition(@RequestBody Treatment advice){
        List<Treatment> record = adviceService.findByCondition(advice);
        return JSON.toJSONString(record);
    }

    @RequestMapping(path = "/findByCId", method = RequestMethod.POST)
    @ResponseBody
    public String findByCId(@RequestBody Treatment advice){
        List<Treatment> record = adviceService.selectByCId(advice);
        return JSON.toJSONString(record);
    }

    @RequestMapping(path = "/findByD", method = RequestMethod.POST)
    @ResponseBody
    public String findByD(@RequestBody TreatmentDKey advice){
        List<Treatment> record = adviceService.selectByD(advice);
        return JSON.toJSONString(record);
    }
}
