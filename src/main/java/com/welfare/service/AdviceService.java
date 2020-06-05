package com.welfare.service;

import com.welfare.entity.Advice;

import java.util.List;
import java.util.Map;

public interface AdviceService {

    Map<String, Object> register(Advice children);
    //查询全部活动
    List<Advice> selectAll();
    List<Advice> findByCondition(Advice record);
    List<Advice> selectAll1();
    List<Advice> selectAll2();
    List<Advice> selectAll3();
    int deleteById(String adviceid);

    Advice insert(Advice record);

    Advice selectById(String adviceid);

    Advice selectByDId(String doctorid);

    Advice selectByCId(String childrenid);

    int updateById(Advice record);

}
