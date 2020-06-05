package com.welfare.controller;

import com.alibaba.fastjson.JSON;
import com.welfare.entity.Grow;
import com.welfare.entity.Result;
import com.welfare.entity.Staff;
import com.welfare.service.GrowService;
import com.welfare.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(path = "/grow")
@CrossOrigin //允许跨域请求
public class GrowController {
    @Autowired
    private GrowService growService;

//    @Value("${server.servlet.context-path}")
//    private String contextPath;



    /**
     * 修改职工信息(id)
     * @param staff
     * @return
     */
    @RequestMapping(path = "/updateById", method = RequestMethod.POST)
    @ResponseBody
    public String updateById(@RequestBody Grow staff){
        int i = growService.updateById(staff);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 插入职工信息(id)
     * @param staff
     * @return
     */
    @RequestMapping(path = "/insert", method = RequestMethod.POST)
    @ResponseBody
    public String insert(@RequestBody Grow staff){
        Grow insert =growService.insert(staff);
        return JSON.toJSONString(insert);
    }

    /**
     * 注册
     * @param grow
     * @return
     */
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    @ResponseBody
    public String register (@RequestBody Grow grow) {
        Map<String, Object> map = growService.register(grow);
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
        List<Grow> list = growService.selectAll();
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
        List<Grow> list = growService.selectAll1();
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
        List<Grow> list = growService.selectAll2();
        return JSON.toJSONString(list);
    }

    /**
     * 删除职工
     * @param staff
     * @return
     */
    @RequestMapping(path = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public String delete(@RequestBody Grow staff){
        int i = growService.deleteById(staff.getGrowid());
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 删除职工
     * @param childrenid
     * @return
     */
    @RequestMapping(path = "/deleteByCId", method = RequestMethod.POST)
    @ResponseBody
    public String deleteByCId(@RequestBody String childrenid){
        int i = growService.deleteByCId(childrenid);
        return JSON.toJSONString(new Result(i>0));
    }

    /**
     * 查询单个
     * @param staff
     * @return
     */
    @RequestMapping(path = "/findById", method = RequestMethod.POST)
    @ResponseBody
    public String findById(@RequestBody Grow staff){
        Grow record = growService.selectById(staff.getGrowid());
        return JSON.toJSONString(record);
    }

    /**
     * 查询单个
     * @param staff
     * @return
     */
    @RequestMapping(path = "/findByCondition", method = RequestMethod.POST)
    @ResponseBody
    public String findByCondition(@RequestBody Grow staff){
        List<Grow> record = growService.findByCondition(staff);
        return JSON.toJSONString(record);
    }
}
