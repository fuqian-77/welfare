package com.welfare.dao;

import com.welfare.entity.Staff;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StaffMapper {
    List<Staff> selectAll();

    int deleteById(String staffid);

    List<Staff> findByCondition(Staff record);

    int insert(Staff record);

    Staff selectById(String staffid);

    int updateById(Staff record);

//    int updateByName(Staff record);

    Staff selectByName(String name);
}
