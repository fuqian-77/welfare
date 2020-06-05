package com.welfare.serviceImpl;


import com.welfare.dao.AdviceMapper;
import com.welfare.dao.TreatmentMapper;
import com.welfare.entity.Advice;
import com.welfare.entity.Treatment;
import com.welfare.entity.TreatmentDKey;
import com.welfare.entity.TreatmentKey;
import com.welfare.service.AdviceService;
import com.welfare.service.TreatmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TreatmentServiceImpl implements TreatmentService {
    @Autowired
    private TreatmentMapper adviceMapper;


    @Override
    public List<Treatment> selectAll() {
        return adviceMapper.selectAll();
    }

    @Override
    public List<Treatment> selectAll1() {
        return adviceMapper.selectAll1();
    }

    @Override
    public List<Treatment> selectAll2() {
        return adviceMapper.selectAll2();
    }

    @Override
    public List<Treatment> findByCondition(Treatment record) {
        return adviceMapper.findByCondition(record);
    }

    @Override
    public int deleteById(TreatmentKey key) {
        return adviceMapper.deleteByPrimaryKey(key);
    }

    @Override
    public Treatment insert(Treatment record) {
        adviceMapper.insert(record);
        return record;
    }

    @Override
    public Treatment selectById(TreatmentKey key) {
        return adviceMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateById(Treatment record) {
        return adviceMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<Treatment> selectByCId(Treatment record) {
        return adviceMapper.selectByCId(record);
    }
    @Override
    public List<Treatment> selectByD(TreatmentDKey record) {
        return adviceMapper.selectByD(record);
    }
}
