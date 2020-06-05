package com.welfare.serviceImpl;

import com.welfare.dao.ApplyMapper;
import com.welfare.dao.EducationMapper;
import com.welfare.entity.Apply;
import com.welfare.entity.Education;
import com.welfare.entity.EducationKey;
import com.welfare.service.ApplyService;
import com.welfare.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationServiceImpl implements EducationService {
    @Autowired
    private EducationMapper educationMapper;

    @Override
    public List<Education> selectAll() {
        return educationMapper.findAll();
    }

    @Override
    public List<Education> selectAll1() {
        return educationMapper.findAll1();
    }

    @Override
    public List<Education> selectAll2() {
        return educationMapper.findAll2();
    }

    @Override
    public List<Education> findByCondition(Education record) {
        return educationMapper.findByCondition(record);
    }

    @Override
    public int deleteById(EducationKey key) {
        return educationMapper.deleteByPrimaryKey(key);
    }

    @Override
    public Education insert(Education record) {
        educationMapper.insert(record);
        return record;
    }

    @Override
    public Education selectById(EducationKey key) {
        return educationMapper.selectByPrimaryKey(key);
    }


    @Override
    public int updateById(Education record) {
        return educationMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<Education> selectByCId(Education record) {
        return educationMapper.selectByCId(record);
    }

}
