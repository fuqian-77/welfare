package com.welfare.dao;

import com.welfare.entity.User;
import com.welfare.entity.VisitResult;
import com.welfare.entity.Visitor;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface VisitorMapper {
    int deleteByPrimaryKey(Integer visitorid);

    int insert(Visitor record);

    Visitor selectByPrimaryKey(Integer visitorid);

    int updateByPrimaryKey(Visitor record);

    Visitor selectByName(String name);

    List<Visitor> selectAll();

    List<Visitor> findByCondition(Visitor record);

    int visitNum(Visitor record);

    List<VisitResult> childrenNum(Visitor record);

}