package com.welfare.dao;

import com.welfare.entity.Activity;
import com.welfare.entity.Back;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BackMapper {
    List<Back> selectAll();
    List<Back> selectAll1();
    List<Back> selectAll2();
    int deleteByPrimaryKey(Integer backid);

    int delete(String fosterageid);

    int insert(Back record);

    Back selectByPrimaryKey(Integer backid);

    int updateByPrimaryKey(Back record);


    Back selectByCId(String childrenid);

}
