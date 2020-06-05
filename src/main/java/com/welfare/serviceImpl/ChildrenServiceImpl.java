package com.welfare.serviceImpl;

import com.welfare.dao.ActivityMapper;
import com.welfare.dao.ChildrenMapper;
import com.welfare.entity.Activity;
import com.welfare.entity.Children;
import com.welfare.service.ActivityService;
import com.welfare.service.ChildrenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChildrenServiceImpl implements ChildrenService {
    @Autowired
    private ChildrenMapper childrenMapper;

    @Override
    public Map<String, Object> register(Children children) {
        Map<String, Object> map = new HashMap<>();
        if(childrenMapper.selectById(children.getChildrenid()) != null){
            map.put("Msg", "儿童编号重复!");
            return map;
        }
        int insert = childrenMapper.insert(children);
        if(insert > 0 ){
            map.put("Msg", "添加成功!");
            return map;
        }else{
            map.put("Msg", "注册失败!");
            return map;
        }
    }


    @Override
    public List<Children> selectAll() {
        return childrenMapper.selectAll();
    }

    @Override
    public List<Children> selectAll1() {
        return childrenMapper.selectAll1();
    }

    @Override
    public List<Children> selectAll2() {
        return childrenMapper.selectAll2();
    }

    @Override
    public List<Children> selectIn() {
        return childrenMapper.selectIn();
    }

    @Override
    public List<Children> findByCondition(Children record) {
        return childrenMapper.findByCondition(record);
    }
    @Override
    public int deleteById(String childrenid) {
        return childrenMapper.deleteById(childrenid);
    }

    @Override
    public Children insert(Children record) {
        childrenMapper.insert(record);
        return record;
    }

    @Override
    public Children selectById(String childrenid) {
        return childrenMapper.selectById(childrenid);
    }

    @Override
    public Children selectByName(String name) {
        return childrenMapper.selectByName(name);
    }

    @Override
    public int updateById(Children record) {
        return childrenMapper.updateById(record);
    }

    @Override
    public int updateByName(Children record) {
        return childrenMapper.updateByName(record);
    }

}
