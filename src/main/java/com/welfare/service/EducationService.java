package com.welfare.service;

import com.welfare.entity.Apply;
import com.welfare.entity.Education;
import com.welfare.entity.EducationKey;

import java.util.List;

public interface EducationService {


    //查询全部活动
    List<Education> selectAll();

    List<Education> selectAll1();
    List<Education> selectAll2();
    List<Education> findByCondition(Education record);
    int deleteById(EducationKey key);

    Education insert(Education record);

    Education selectById(EducationKey key);
    List<Education> selectByCId(Education record);
    int updateById(Education record);

}
