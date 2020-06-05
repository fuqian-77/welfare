package com.welfare.serviceImpl;


import com.welfare.dao.BackMapper;
import com.welfare.entity.Back;
import com.welfare.service.BackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BackServiceImpl implements BackService {
    @Autowired
    private BackMapper backMapper;

    @Override
    public List<Back> selectAll() {
        return backMapper.selectAll();
    }

    @Override
    public List<Back> selectAll1() {
        return backMapper.selectAll1();
    }

    @Override
    public List<Back> selectAll2() {
        return backMapper.selectAll2();
    }

    @Override
    public int deleteById(Integer backid) {
        return backMapper.deleteByPrimaryKey(backid);
    }

    @Override
    public int delete(String fosterageid) {
        return backMapper.delete(fosterageid);
    }

    @Override
    public Back insert(Back record) {
        backMapper.insert(record);
        return record;
    }

    @Override
    public Back selectById(Integer backid) {
        return backMapper.selectByPrimaryKey(backid);
    }

    @Override
    public Back selectByCId(String childrenid) {
        return backMapper.selectByCId(childrenid);
    }

    @Override
    public int updateById(Back record) {
        return backMapper.updateByPrimaryKey(record);
    }
}
