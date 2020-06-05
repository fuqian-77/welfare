package com.welfare.dao;

import com.welfare.entity.Activity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ActivityMapper {
    List<Activity> selectAll();//全部
    List<Activity> selectAll1();//已审核
    List<Activity> selectAll2();//未审核
    List<Activity> selectAll3();//已审核
    List<Activity> selectAll4();//未审核
    int deleteById(Integer activityid);

    int insert(Activity record);

    Activity selectById(Integer activityid);

    int updateById(Activity record);

    List<Activity> selectByUId(Activity record);
}
