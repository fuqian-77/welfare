package com.welfare.dao;

import com.welfare.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    int deleteByPrimaryKey(String userid);

    int insert(User record);

    User selectByPrimaryKey(String userid);

    int updateByPrimaryKey(User record);

//    int updateByName(User record);

    User selectByName(String name);

    List<User> selectAll();

    List<User> findByCondition(User record);

}