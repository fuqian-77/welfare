package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Leave;
import com.welfare.entity.Result;
import com.welfare.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/leave")
@CrossOrigin //允许跨域请求
public class LeaveController {
    @Autowired
    private LeaveService leaveService;

//    @Value("${server.servlet.context-path}")
//    private String contextPath;



    /**
     * 修改职工信息(id)
     * @param leave
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Leave leave){
        int i = leaveService.updateById(leave);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 插入职工信息(id)
     * @param leave
     * @return
     */
    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Leave leave){
        Leave insert =leaveService.insert(leave);
        return JSON.toJSONString(insert);
    }

    /**
     * 注册
     * @param leave
     * @return
     */
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register (@RequestBody Leave leave) {
        Map<String, Object> map = leaveService.register(leave);
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
        List<Leave> list = leaveService.selectAll();
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
        List<Leave> list = leaveService.selectAll1();
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
        List<Leave> list = leaveService.selectAll2();
        return JSON.toJSONString(list);
    }

    /**
     * 删除职工
     * @param staff
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Leave staff){
        int i = leaveService.deleteById(staff.getChildrenid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param staff
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Leave staff){
        Leave record = leaveService.selectById(staff.getLeaveid());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param staff
     * @return
     */
    @RequestMapping(path = "/findByCId", method = RequestMethod.POST)
    @ResponseBody
    public String findByCId(@RequestBody Leave staff){
        Leave record = leaveService.selectByCId(staff.getChildrenid());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param staff
     * @return
     */
    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondition(@RequestBody Leave staff){
        List<Leave> record = leaveService.findByCondition(staff);
        return JSON.toJSONString(record);
    }
}
