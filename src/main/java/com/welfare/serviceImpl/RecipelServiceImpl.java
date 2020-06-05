package com.welfare.serviceImpl;


import com.welfare.dao.RecipelMapper;
import com.welfare.entity.Recipel;
import com.welfare.service.RecipelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipelServiceImpl implements RecipelService {
    @Autowired
    private RecipelMapper adviceMapper;


    @Override
    public List<Recipel> selectAll() {
        return adviceMapper.selectAll();
    }

    @Override
    public List<Recipel> selectAll1() {
        return adviceMapper.selectAll1();
    }

    @Override
    public List<Recipel> selectAll2() {
        return adviceMapper.selectAll2();
    }

    @Override
    public int deleteById(String adviceid) {
        return adviceMapper.deleteByPrimaryKey(adviceid);
    }

    @Override
    public Recipel insert(Recipel record) {
        adviceMapper.insert(record);
        return record;
    }

    @Override
    public Recipel selectById(String adviceid) {
        return adviceMapper.selectByPrimaryKey(adviceid);
    }


    @Override
    public int updateById(Recipel record) {
        return adviceMapper.updateByPrimaryKey(record);
    }
}
