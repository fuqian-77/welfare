package com.welfare.serviceImpl;

import com.welfare.dao.ActivityMapper;
import com.welfare.dao.ApplyMapper;
import com.welfare.entity.Activity;
import com.welfare.entity.Apply;
import com.welfare.service.ActivityService;
import com.welfare.service.ApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplyServiceImpl implements ApplyService {
    @Autowired
    private ApplyMapper applyMapper;

    @Override
    public List<Apply> selectAll() {
        return applyMapper.selectAll();
    }

    @Override
    public List<Apply> selectAll1() {
        return applyMapper.selectAll1();
    }

    @Override
    public List<Apply> selectAll2() {
        return applyMapper.selectAll2();
    }

    @Override
    public List<Apply> selectAll3() {
        return applyMapper.selectAll3();
    }

    @Override
    public int deleteById(Integer applyid) {
        return applyMapper.deleteByPrimaryKey(applyid);
    }

    @Override
    public Apply insert(Apply record) {
        applyMapper.insert(record);
        return record;
    }

    @Override
    public Apply selectById(Integer applyid) {
        return applyMapper.selectByPrimaryKey(applyid);
    }

    @Override
    public List<Apply> selectByUId(String userid) {
        return applyMapper.selectByUId(userid);
    }

    @Override
    public int updateById(Apply record) {
        return applyMapper.updateById(record);
    }


}
