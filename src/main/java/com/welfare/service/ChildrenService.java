package com.welfare.service;

import com.welfare.entity.Activity;
import com.welfare.entity.Children;

import java.util.List;
import java.util.Map;

public interface ChildrenService {


    //查询全部活动
    List<Children> selectAll();
    List<Children> findByCondition(Children record);
    List<Children> selectAll1();
    List<Children> selectAll2();
    List<Children> selectIn();
    //用户注册
    Map<String, Object> register(Children children);

    int deleteById(String childrenid);

    Children insert(Children record);

    Children selectById(String childrenid);

    Children selectByName(String name);

    int updateById(Children record);
    int updateByName(Children record);
}
