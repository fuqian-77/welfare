package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Apply;
import com.welfare.entity.Result;
import com.welfare.service.ApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(path = "/apply")
@CrossOrigin //允许跨域请求
public class ApplyController {
    @Autowired
    private ApplyService applyService;

    @Value("${server.servlet.context-path}")
    private String contextPath;

    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Apply staff){
        Apply insert =applyService.insert(staff);
        return JSON.toJSONString(insert);
    }

    /**
     * 修改申请信息(id)
     * @param apply
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Apply apply){
        int i = applyService.updateById(apply);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 申请列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll", method = RequestMethod.POST)
    @ResponseBody
    public String findAll(){
        List<Apply> list = applyService.selectAll();
        return JSON.toJSONString(list);
    }

    /**
     * 申请列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll1", method = RequestMethod.POST)
    @ResponseBody
    public String findAll1(){
        List<Apply> list = applyService.selectAll1();
        return JSON.toJSONString(list);
    }

    /**
     * 申请列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll2", method = RequestMethod.POST)
    @ResponseBody
    public String findAll2(){
        List<Apply> list = applyService.selectAll2();
        return JSON.toJSONString(list);
    }

    /**
     * 申请列表（全部）
     * @param
     * @return
     */
    @RequestMapping(path = "/findAll3", method = RequestMethod.POST)
    @ResponseBody
    public String findAll3(){
        List<Apply> list = applyService.selectAll3();
        return JSON.toJSONString(list);
    }

    /**
     * 删除申请
     * @param apply
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Apply apply){
        int i = applyService.deleteById(apply.getApplyid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param apply
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Apply apply){
        Apply record = applyService.selectById(apply.getApplyid());
        return JSON.toJSONString(record);
    }


    /**
     * 查询单个
     * @param apply
     * @return
     */
    @RequestMapping(path = "/findByUId", method = RequestMethod.POST)
    @ResponseBody
    public String findByUId(@RequestBody Apply apply){
        List<Apply> record = applyService.selectByUId(apply.getUserid());
        return JSON.toJSONString(record);
    }
}
