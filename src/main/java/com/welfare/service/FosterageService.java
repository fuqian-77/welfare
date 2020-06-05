package com.welfare.service;

import com.welfare.entity.Fosterage;

import java.util.List;
import java.util.Map;

public interface FosterageService {


    //查询全部活动
    List<Fosterage> selectAll();
    List<Fosterage> selectAll1();
    List<Fosterage> selectAll2();
    List<Fosterage> selectAllj();
    List<Fosterage> selectAlll();
    Map<String, Object> register(Fosterage fosterage);

    int deleteById(String fosterageid);

    Fosterage insert(Fosterage record);

    Fosterage selectById(String fosterageid);
    List<Fosterage> selectByCId(Fosterage record);
    int updateById(Fosterage record);
    List<Fosterage> selectByUser(Fosterage record);
}
