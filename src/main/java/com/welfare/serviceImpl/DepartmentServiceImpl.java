package com.welfare.serviceImpl;

import com.welfare.dao.ActivityMapper;
import com.welfare.dao.DepartmentMapper;
import com.welfare.entity.Activity;
import com.welfare.entity.Department;
import com.welfare.service.ActivityService;
import com.welfare.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    private DepartmentMapper departmentMapper;




    @Override
    public List<Department> selectAll() {
        return departmentMapper.selectAll();
    }

    @Override
    public int deleteById(String departmentid) {
        return 0;
    }

    @Override
    public Department insert(Department record) {
        return null;
    }

    @Override
    public Department selectById(String departmentid) {
        return null;
    }

    @Override
    public int updateById(Department record) {
        return 0;
    }
}
