package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Fosterage;
import com.welfare.entity.Result;
import com.welfare.service.FosterageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/fosterage")
@CrossOrigin //允许跨域请求
public class FosterageController {
    @Autowired
    private FosterageService fosterageService;

//    @Value("${server.servlet.context-path}")
//    private String contextPath;



    /**
     * 修改职工信息(id)
     * @param staff
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Fosterage staff){
        int i = fosterageService.updateById(staff);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 插入职工信息(id)
     * @param staff
     * @return
     */
    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Fosterage staff){
        Fosterage insert =fosterageService.insert(staff);
        return JSON.toJSONString(insert);
    }

    /**
     * 注册
     * @param fosterage
     * @return
     */
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register (@RequestBody Fosterage fosterage) {
        Map<String, Object> map = fosterageService.register(fosterage);
        return JSON.toJSONString(map);
    }


    /**
     * 职工列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<Fosterage> list = fosterageService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 职工列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAllj", method = RequestMethod.POST)
    @ResponseBody
    public String findAllj(){
        List<Fosterage> list = fosterageService.selectAllj();
        return JSON.toJSONString(list);
    }

    /**
     * 职工列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAlll", method = RequestMethod.POST)
    @ResponseBody
    public String findAlll(){
        List<Fosterage> list = fosterageService.selectAlll();
        return JSON.toJSONString(list);
    }

    /**
     * 职工列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll1", method = RequestMethod.POST)
    @ResponseBody
    public String findAll1(){
        List<Fosterage> list = fosterageService.selectAll1();
        return JSON.toJSONString(list);
    }

    /**
     * 职工列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll2", method = RequestMethod.POST)
    @ResponseBody
    public String findAll2(){
        List<Fosterage> list = fosterageService.selectAll2();
        return JSON.toJSONString(list);
    }

    /**
     * 删除职工
     * @param staff
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Fosterage staff){
        int i = fosterageService.deleteById(staff.getFosterageid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param staff
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Fosterage staff){
        Fosterage record = fosterageService.selectById(staff.getFosterageid());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param staff
     * @return
     */
    @RequestMapping(path = "/findByUser", method = RequestMethod.POST)
    @ResponseBody
    public String findByUser(@RequestBody Fosterage  staff){
       List<Fosterage>  record = fosterageService.selectByUser(staff);
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param staff
     * @return
     */
    @RequestMapping(path = "/findByCId", method = RequestMethod.POST)
    @ResponseBody
    public String findByCId(@RequestBody Fosterage  staff){
        List<Fosterage>  record = fosterageService.selectByCId(staff);
        return JSON.toJSONString(record);
    }
}
