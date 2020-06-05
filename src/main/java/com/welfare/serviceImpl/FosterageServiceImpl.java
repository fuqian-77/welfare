package com.welfare.serviceImpl;

import com.welfare.dao.FosterageMapper;
import com.welfare.entity.Fosterage;
import com.welfare.service.FosterageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FosterageServiceImpl implements FosterageService {
    @Autowired
    private FosterageMapper fosterageMapper;

    @Override
    public Map<String, Object> register(Fosterage fosterage) {
        Map<String, Object> map = new HashMap<>();
        if(fosterageMapper.selectByPrimaryKey(fosterage.getFosterageid()) != null){
            map.put("Msg", "编号重复!");
            return map;
        }
        int insert = fosterageMapper.insert(fosterage);
        if(insert > 0 ){
            map.put("Msg", "添加成功!");
            return map;
        }else{
            map.put("Msg", "注册失败!");
            return map;
        }
    }

    @Override
    public List<Fosterage> selectAll() {
        return fosterageMapper.selectAll();
    }

    @Override
    public List<Fosterage> selectAll1() {
        return fosterageMapper.selectAll1();
    }

    @Override
    public List<Fosterage> selectAll2() {
        return fosterageMapper.selectAll2();
    }

    @Override
    public List<Fosterage> selectAllj() {
        return fosterageMapper.selectAllj();
    }

    @Override
    public List<Fosterage> selectAlll() {
        return fosterageMapper.selectAlll();
    }

    @Override
    public int deleteById(String fosterageid) {
        return fosterageMapper.deleteByPrimaryKey(fosterageid);
    }

    @Override
    public Fosterage insert(Fosterage record) {
        fosterageMapper.insert(record);
        return record;
    }

    @Override
    public Fosterage selectById(String fosterageid) {
        return fosterageMapper.selectByPrimaryKey(fosterageid);
    }

    @Override
    public int updateById(Fosterage record) {
        return fosterageMapper.updateByPrimaryKey(record);
    }
    @Override
    public List<Fosterage> selectByUser(Fosterage record) {
        return fosterageMapper.selectByUser(record);
    }

    @Override
    public List<Fosterage> selectByCId(Fosterage record) {
        return fosterageMapper.selectByCId(record);
    }
}
