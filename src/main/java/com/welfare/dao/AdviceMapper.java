package com.welfare.dao;

import com.welfare.entity.Activity;
import com.welfare.entity.Advice;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdviceMapper {
    List<Advice> selectAll();
    List<Advice> selectAll1();
    List<Advice> selectAll2();
    List<Advice> selectAll3();
    int deleteById(String adviceid);

    int insert(Advice record);

    List<Advice> findByCondition(Advice record);
    int updateById(Advice record);

    Advice selectByDId(String doctorid);

    Advice selectById(String adviceid);

    Advice selectByCId(String childrenid);
}
