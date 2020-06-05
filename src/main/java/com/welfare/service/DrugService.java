package com.welfare.service;

import com.welfare.entity.Advice;
import com.welfare.entity.Drug;

import java.util.List;
import java.util.Map;

public interface DrugService {

    //查询全部药品
    List<Drug> selectAll();
    List<Drug> findByCondition(Drug record);
    Map<String, Object> register(Drug user);

    int deleteById(String drugid);

    Drug insert(Drug record);

    Drug selectById(String drugid);

    Drug selectByName(String name);

    int updateById(Drug record);

    int updateByName(Drug record);
}
