package com.welfare.service;

import com.welfare.entity.Apply;

import java.util.List;

public interface ApplyService {


    //查询全部活动
    List<Apply> selectAll();

    List<Apply> selectAll1();
    List<Apply> selectAll2();
    List<Apply> selectAll3();
    int deleteById(Integer applyid);

    Apply insert(Apply record);

    Apply selectById(Integer applyid);

    List<Apply> selectByUId(String userid);

    int updateById(Apply record);

}
