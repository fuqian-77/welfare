package com.welfare.dao;

import com.welfare.entity.Leave;

import java.util.List;

public interface LeaveMapper {
    List<Leave> selectAll();
    List<Leave> selectAll1();
    List<Leave> selectAll2();
    int deleteById(String childrenid);

    List<Leave> findByCondition(Leave record);
    int insert(Leave record);

    Leave selectById(String leaveid);
    Leave selectByCId(String childrenid);

    int updateById(Leave record);
}