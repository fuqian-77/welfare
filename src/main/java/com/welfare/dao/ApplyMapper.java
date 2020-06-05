package com.welfare.dao;

import com.welfare.entity.Activity;
import com.welfare.entity.Apply;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ApplyMapper {
    List<Apply> selectAll();
    List<Apply> selectAll1();
    List<Apply> selectAll2();
    List<Apply> selectAll3();

    int deleteByPrimaryKey(Integer applyid);

    int insert(Apply record);

    Apply selectByPrimaryKey(Integer applyid);

    int updateById(Apply record);

    List<Apply> selectByUId(String userid);
}
