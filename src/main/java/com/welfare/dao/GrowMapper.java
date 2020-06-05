package com.welfare.dao;

import com.welfare.entity.Grow;
import com.welfare.entity.Staff;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GrowMapper {
    List<Grow> selectAll();
    List<Grow> selectAll1();
    List<Grow> selectAll2();
    int deleteById(String growid);
    int deleteByCId(String childrenid);
    int insert(Grow record);
    List<Grow> findByCondition(Grow record);
    Grow selectById(String growid);

    int updateById(Grow record);


}
