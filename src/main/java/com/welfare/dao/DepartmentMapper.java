package com.welfare.dao;

import com.welfare.entity.Activity;
import com.welfare.entity.Department;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DepartmentMapper {
    List<Department> selectAll();

    int deleteById(String departmentid);

    int insert(Department record);

    Department selectById(String departmentid);

    int updateById(Department record);
}
