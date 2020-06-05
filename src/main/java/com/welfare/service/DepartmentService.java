package com.welfare.service;

import com.welfare.entity.Activity;
import com.welfare.entity.Department;

import java.util.List;

public interface DepartmentService {


    //查询全部活动
    List<Department> selectAll();


    int deleteById(String departmentid);

    Department insert(Department record);

    Department selectById(String departmentid);

    int updateById(Department record);
}
