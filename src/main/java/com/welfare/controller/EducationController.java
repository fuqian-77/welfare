package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Apply;
import com.welfare.entity.Education;
import com.welfare.entity.EducationKey;
import com.welfare.entity.Result;
import com.welfare.service.ApplyService;
import com.welfare.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "/education")
@CrossOrigin //允许跨域请求
public class EducationController {
    @Autowired
    private EducationService educationService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Education record){
        Education insert =educationService.insert(record);
        return JSON.toJSONString(insert);
    }

    /**
     * 修改信息(id)
     * @param apply
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Education apply){
        int i = educationService.updateById(apply);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<Education> list = educationService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 列表（未审核）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll1", method = RequestMethod.POST)
    @ResponseBody
    public String findAll1(){
        List<Education> list = educationService.selectAll1();
        return JSON.toJSONString(list);
    }

    /**
     * 列表（已审核）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll2", method = RequestMethod.POST)
    @ResponseBody
    public String findAll2(){
        List<Education> list = educationService.selectAll2();
        return JSON.toJSONString(list);
    }

    /**
     * 删除申请
     * @param key
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody EducationKey key){
        int i = educationService.deleteById(key);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param apply
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody EducationKey apply){
        Education record = educationService.selectById(apply);
        return JSON.toJSONString(record);
    }


    /**
     * 查询单个
     * @param apply
     * @return
     */
    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondition(@RequestBody Education apply){
       List<Education>  record = educationService.findByCondition(apply);
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param apply
     * @return
     */
    @RequestMapping(path = "/findByCId", method = RequestMethod.POST)
    @ResponseBody
    public String findByCId(@RequestBody Education apply){
        List<Education>  record = educationService.selectByCId(apply);
        return JSON.toJSONString(record);
    }

}
