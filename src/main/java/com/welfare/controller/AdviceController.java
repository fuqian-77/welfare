package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Advice;
import com.welfare.entity.Result;
import com.welfare.service.AdviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/advice")
@CrossOrigin //允许跨域请求
public class AdviceController {
    @Autowired
    private AdviceService adviceService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    /**
     * 注册
     * @param children
     * @return
     */
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register (@RequestBody Advice children) {
        Map<String, Object> map = adviceService.register(children);
        return JSON.toJSONString(map);
    }
    /**
     * 修改医嘱信息(id)
     * @param advice
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Advice advice){
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
        List<Advice> list = adviceService.selectAll();
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
        List<Advice> list = adviceService.selectAll1();
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
        List<Advice> list = adviceService.selectAll2();
        return JSON.toJSONString(list);
    }
    /**
     * 医嘱列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll3", method = RequestMethod.POST)
    @ResponseBody
    public String findAll3(){
        List<Advice> list = adviceService.selectAll3();
        return JSON.toJSONString(list);
    }

    /**
     * 删除医嘱
     * @param advice
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Advice advice){
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
    public String findById(@RequestBody Advice advice){
        Advice record = adviceService.selectById(advice.getAdviceid());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param advice
     * @return
     */
    @RequestMapping(path = "/findByDId", method = RequestMethod.POST)
    @ResponseBody
    public String findByDId(@RequestBody Advice advice){
        Advice record = adviceService.selectByDId(advice.getDoctorid());
        return JSON.toJSONString(record);
    }


    /**
     * 查询单个
     * @param advice
     * @return
     */
    @RequestMapping(path = "/findByCId", method = RequestMethod.POST)
    @ResponseBody
    public String findByCId(@RequestBody Advice advice){
        Advice record = adviceService.selectByCId(advice.getChildrenid());
        return JSON.toJSONString(record);
    }

    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Advice advice){
        Advice record = adviceService.insert(advice);
        return JSON.toJSONString(record);
    }

    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondtion(@RequestBody Advice advice){
        List<Advice> record = adviceService.findByCondition(advice);
        return JSON.toJSONString(record);
    }
}
