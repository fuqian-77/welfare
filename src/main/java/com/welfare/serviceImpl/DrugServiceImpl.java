package com.welfare.serviceImpl;

import com.welfare.dao.ActivityMapper;
import com.welfare.dao.DrugMapper;
import com.welfare.entity.Activity;
import com.welfare.entity.Drug;
import com.welfare.service.ActivityService;
import com.welfare.service.DrugService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DrugServiceImpl implements DrugService {
    @Autowired
    private DrugMapper activityMapper;
    @Override
    public Map<String, Object> register(Drug user) {
        Map<String, Object> map = new HashMap<>();
        if(activityMapper.selectByPrimaryKey(user.getDrugid()) != null){
            map.put("Msg", "药品编号重复!");
            return map;
        }
        int insert = activityMapper.insert(user);
        if(insert > 0 ){
            map.put("Msg", "注册成功!");
            return map;
        }else{
            map.put("Msg", "注册失败!");
            return map;
        }
    }

    @Override
    public List<Drug> selectAll() {
        return activityMapper.selectAll();
    }

    @Override
    public List<Drug> findByCondition(Drug record) {
        return activityMapper.findByCondition(record);
    }

    @Override
    public int deleteById(String activityid) {
        return activityMapper.deleteByPrimaryKey(activityid);
    }

    @Override
    public Drug insert(Drug record) {
        activityMapper.insert(record);
        return record;
    }

    @Override
    public Drug selectById(String activityid) {
        return activityMapper.selectByPrimaryKey(activityid);
    }

    @Override
    public Drug selectByName(String name) {
        return activityMapper.selectByName(name);
    }

    @Override
    public int updateById(Drug record) {
        return activityMapper.updateByPrimaryKey(record);
    }

    @Override
    public int updateByName(Drug record) {
        return activityMapper.updateByName(record);
    }

}
