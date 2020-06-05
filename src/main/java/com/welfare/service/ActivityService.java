package com.welfare.service;

import com.welfare.entity.Activity;
import com.welfare.entity.Staff;

import java.util.List;
import java.util.Map;

public interface ActivityService {


    //查询全部活动
    List<Activity> selectAll();
    List<Activity> selectAll1();
    List<Activity> selectAll2();
    List<Activity> selectAll3();//已审核
    List<Activity> selectAll4();//未审核
    int deleteById(Integer activityid);

    Activity insert(Activity record);

    Activity selectById(Integer activityid);
    List<Activity> selectByUId(Activity record);
    int updateById(Activity record);

}
