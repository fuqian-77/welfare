package com.welfare.service;

import com.welfare.entity.Activity;
import com.welfare.entity.Back;

import java.util.List;

public interface BackService {


    //查询全部活动
    List<Back> selectAll();
    List<Back> selectAll1();
    List<Back> selectAll2();

    int deleteById(Integer backid);
    int delete(String fosterageid);
    Back insert(Back record);

    Back selectById(Integer backid);

    Back selectByCId(String childrenid);

    int updateById(Back record);
}
