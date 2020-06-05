package com.welfare.dao;

import com.welfare.entity.Recruit;
import com.welfare.entity.RecruitKey;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecruitMapper {
    List<Recruit> selectAll();//全部
    List<Recruit> selectAll1();//审核中
    List<Recruit> selectAll2();//未招聘中
    List<Recruit> selectAll3();//已完成
    int deleteById(String recruitid);

    int insert(Recruit record);

    Recruit selectById(String recruitid);

    Recruit apply(RecruitKey key);
    List<Recruit> selectByUId(String userid);
    List<Recruit> findByCondition(Recruit record);
    int updateById(Recruit record);
    int activityNum(Recruit userid);
    int socialNum(Recruit userid);

}
