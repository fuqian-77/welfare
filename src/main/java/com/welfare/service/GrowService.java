package com.welfare.service;

import com.welfare.entity.Children;
import com.welfare.entity.Grow;

import java.util.List;
import java.util.Map;

public interface GrowService {


    //查询全部活动
    List<Grow> selectAll();
    List<Grow> selectAll1();
    List<Grow> selectAll2();
    Map<String, Object> register(Grow grow);
    List<Grow> findByCondition(Grow record);
    int deleteById(String growid);
    int deleteByCId(String childrenid);
    Grow insert(Grow record);

    Grow selectById(String growid);

    int updateById(Grow record);

}
