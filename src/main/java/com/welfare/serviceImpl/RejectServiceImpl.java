package com.welfare.serviceImpl;

import com.welfare.dao.RejectMapper;
import com.welfare.entity.Reject;
import com.welfare.entity.RejectKey;
import com.welfare.service.RejectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RejectServiceImpl implements RejectService {
    @Autowired
    private RejectMapper rejectMapper;

    @Override
    public List<Reject> selectAllr() {
        return rejectMapper.selectAllr();
    }

    @Override
    public List<Reject> selectAlla() {
        return rejectMapper.selectAlla();
    }

    @Override
    public int deleteById(Integer rejectid) {
        return rejectMapper.deleteByPrimaryKey(rejectid);
    }

    @Override
    public Reject insert(Reject record) {
        rejectMapper.insert(record);
        return record;
    }

    @Override
    public Reject selectById(Integer rejectid) {
        return  rejectMapper.selectByPrimaryKey(rejectid);
    }
    @Override
    public Reject selectr(RejectKey key) {
        return  rejectMapper.selectr(key);
    }

    @Override
    public int updateById(Reject record) {
        return rejectMapper.updateByPrimaryKey(record);
    }

}
