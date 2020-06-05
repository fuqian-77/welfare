package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Activity;
import com.welfare.entity.Department;
import com.welfare.entity.Result;
import com.welfare.service.ActivityService;
import com.welfare.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "/department")
@CrossOrigin //允许跨域请求
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @Value("${server.servlet.context-path}")
    private String contextPath;



    /**
     * 修改部门信息(id)
     * @param department
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Department department){
        int i = departmentService.updateById(department);
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
        List<Department> list = departmentService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 删除部门
     * @param department
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Department department){
        int i = departmentService.deleteById(department.getDepartmentid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param department
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Department department){
        Department record = departmentService.selectById(department.getDepartmentid());
        return JSON.toJSONString(record);
    }
}
