package com.welfare.service;

import com.welfare.entity.Recruit;
import com.welfare.entity.RecruitKey;

import java.util.List;
import java.util.Map;

public interface RecruitService {

    Map<String, Object> register(Recruit record);
    //查询全部
    List<Recruit> selectAll();

    //查询审核中
    List<Recruit> selectAll1();
    //查询招聘中
    List<Recruit> selectAll2();
    List<Recruit> findByCondition(Recruit record);
    //查询完成
    List<Recruit> selectAll3();

    int deleteById(String recruitid);

    Recruit insert(Recruit record);

    Recruit selectById(String recruitid);

    Recruit apply(RecruitKey key);

    List<Recruit> selectByUId(String userid);

    int updateById(Recruit record);

    int activityNum(Recruit record);
    int socialNum(Recruit record);

}
