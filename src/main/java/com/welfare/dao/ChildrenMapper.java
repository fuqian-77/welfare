package com.welfare.dao;

import com.welfare.entity.Activity;
import com.welfare.entity.Children;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ChildrenMapper {
    List<Children> selectAll();
    List<Children> selectAll1();
    List<Children> selectAll2();
    List<Children> selectIn();
    int deleteById(String childrenid);
    List<Children> findByCondition(Children record);
    int insert(Children record);

    Children selectById(String childrenid);

    int updateById(Children record);

    int updateByName(Children record);

    Children selectByName(String name);
}
