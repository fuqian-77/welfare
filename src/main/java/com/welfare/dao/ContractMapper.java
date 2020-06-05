package com.welfare.dao;

import com.welfare.entity.Activity;
import com.welfare.entity.Contract;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ContractMapper {
    List<Contract> selectAll();

    int deleteById(String contractid);

    int insert(Contract record);

    Contract selectById(String contractid);

    Contract selectByCId(String childrenid);

    int updateById(Contract record);


}
