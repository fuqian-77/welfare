package com.welfare.service;

import com.welfare.entity.User;
import com.welfare.entity.VisitResult;
import com.welfare.entity.Visitor;

import java.util.List;
import java.util.Map;

public interface VisitorService {



    //查询全部拜访记录
    List<Visitor> selectAll();

    Map<String, Object> register(Visitor visitor);

    int deleteById(Integer visitorid);

    Visitor selectById(Integer visitorid);

    Visitor selectByName(String name);

    Visitor insert(Visitor record);

    int updateById(Visitor record);

    List<Visitor> findByCondition(Visitor record);

    int visitNum(Visitor record);

    List<VisitResult> childrenNum(Visitor record);

}
