package com.welfare.serviceImpl;

import com.welfare.dao.RecruitMapper;
import com.welfare.entity.Recruit;
import com.welfare.entity.RecruitKey;
import com.welfare.service.RecruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RecruitServiceImpl implements RecruitService {
    @Autowired
    private RecruitMapper recruitMapper;

    @Override
    public Map<String, Object> register(Recruit recruit) {
        Map<String, Object> map = new HashMap<>();
        if(recruitMapper.selectById(recruit.getRecruitid()) != null){
            map.put("Msg", "用户编号重复!");
            return map;
        }
        int insert = recruitMapper.insert(recruit);
        if(insert > 0 ){
            map.put("Msg", "添加成功!");
            return map;
        }else{
            map.put("Msg", "添加失败!");
            return map;
        }
    }


    @Override
    public List<Recruit> selectAll() {
        return recruitMapper.selectAll();
    }

    @Override
    public List<Recruit> selectAll1() {
        return recruitMapper.selectAll1();
    }

    @Override
    public List<Recruit> selectAll2() {
        return recruitMapper.selectAll2();
    }
    @Override
    public List<Recruit> findByCondition(Recruit record) {
        return recruitMapper.findByCondition(record);
    }
    @Override
    public List<Recruit> selectAll3() {
        return recruitMapper.selectAll3();
    }

    @Override
    public int deleteById(String recruitid) {
        return recruitMapper.deleteById(recruitid);
    }

    @Override
    public Recruit insert(Recruit record) {
        recruitMapper.insert(record);
        return record;
    }

    @Override
    public Recruit selectById(String recruitid) {
        return recruitMapper.selectById(recruitid);
    }

    @Override
    public Recruit apply(RecruitKey key) {
        return recruitMapper.apply(key);
    }


    @Override
    public List<Recruit> selectByUId(String userid) {
        return recruitMapper.selectByUId(userid);
    }

    @Override
    public int updateById(Recruit record) {
        return recruitMapper.updateById(record);
    }

       @Override
    public int activityNum(Recruit record) {
        return recruitMapper.activityNum(record);
    }

    @Override
    public int socialNum(Recruit record) {
        return recruitMapper.socialNum(record);
    }

}
