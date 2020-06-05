package com.welfare.service;

import com.welfare.entity.Leave;

import java.util.List;
import java.util.Map;

public interface LeaveService {


    //查询全部活动
    List<Leave> selectAll();
    List<Leave> selectAll1();
    List<Leave> selectAll2();
    Map<String, Object> register(Leave leave);
    List<Leave> findByCondition(Leave record);
    int deleteById(String childrenid);

    Leave insert(Leave record);

    Leave selectById(String leaveid);

    Leave selectByCId(String childrenid);

    int updateById(Leave record);

}
