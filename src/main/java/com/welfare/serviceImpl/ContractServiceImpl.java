package com.welfare.serviceImpl;

import com.welfare.dao.ActivityMapper;
import com.welfare.dao.ContractMapper;
import com.welfare.entity.Activity;
import com.welfare.entity.Contract;
import com.welfare.service.ActivityService;
import com.welfare.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractServiceImpl implements ContractService {
    @Autowired
    private ContractMapper contractMapper;




    @Override
    public List<Contract> selectAll() {
        return contractMapper.selectAll();
    }

    @Override
    public int deleteById(String contractid) {
        return 0;
    }

    @Override
    public Contract insert(Contract record) {
        return null;
    }

    @Override
    public Contract selectById(String contractid) {
        return null;
    }

    @Override
    public Contract selectByCId(String childrenid) {
        return null;
    }

    @Override
    public int updateById(Contract record) {
        return 0;
    }
}
