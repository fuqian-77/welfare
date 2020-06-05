package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Department;
import com.welfare.entity.Drug;
import com.welfare.entity.Result;
import com.welfare.service.DrugService;
import com.welfare.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/drug")
public class DrugController {

        @Autowired
        private DrugService drugService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    /**
     * 修改部门信息(id)
     * @param department
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Drug department){
        int i = drugService.updateById(department);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 修改部门信息(id)
     * @param user
     * @return
     */
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register(@RequestBody Drug user){
        Map<String, Object> map = drugService.register(user);
        return JSON.toJSONString(map);
    }

    /**
     * 修改部门信息(id)
     * @param department
     * @return
     */
    @RequestMapping(path = "/updateByName", method = RequestMethod.POST)
    @ResponseBody
    public String updateByName(@RequestBody Drug department){
        int i = drugService.updateByName(department);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     *部门列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<Drug> list =drugService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 删除部门
     * @param department
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Drug department){
        int i = drugService.deleteById(department.getDrugid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param department
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Drug department){
        Drug record = drugService.selectById(department.getDrugid());
        return JSON.toJSONString(record);
    }


    /**
     * 查询单个
     * @param department
     * @return
     */
    @RequestMapping(path = "/findByName", method = RequestMethod.POST)
    @ResponseBody
    public String findByName(@RequestBody Drug department){
        Drug record = drugService.selectByName(department.getName());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param department
     * @return
     */
    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Drug department){
        Drug record = drugService.insert(department);
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param department
     * @return
     */
    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondition(@RequestBody Drug department){
        List<Drug> record = drugService.findByCondition(department);
        return JSON.toJSONString(record);
    }
}

