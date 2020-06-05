package com.welfare.service;

import com.welfare.entity.Activity;
import com.welfare.entity.Contract;

import java.util.List;

public interface ContractService {


    //查询全部活动
    List<Contract> selectAll();


    int deleteById(String contractid);

    Contract insert(Contract record);

    Contract selectById(String contractid);

    Contract selectByCId(String childrenid);

    int updateById(Contract record);
}
