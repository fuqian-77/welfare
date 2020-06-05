package com.welfare.service;


import com.welfare.entity.Treatment;
import com.welfare.entity.TreatmentDKey;
import com.welfare.entity.TreatmentKey;

import java.util.List;
import java.util.Map;

public interface TreatmentService {


    //查询全部
    List<Treatment> selectAll();

    List<Treatment> selectAll1();

    List<Treatment> selectAll2();
    List<Treatment> findByCondition(Treatment record);
    int deleteById(TreatmentKey key);

    Treatment insert(Treatment record);

    Treatment selectById(TreatmentKey key);

    int updateById(Treatment record);
    List<Treatment> selectByCId(Treatment record);
    List<Treatment> selectByD(TreatmentDKey record);
}
