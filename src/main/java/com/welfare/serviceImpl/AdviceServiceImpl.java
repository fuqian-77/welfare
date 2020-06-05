package com.welfare.serviceImpl;


import com.welfare.dao.AdviceMapper;
import com.welfare.entity.Advice;
import com.welfare.service.AdviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdviceServiceImpl implements AdviceService {
    @Autowired
    private AdviceMapper adviceMapper;

    @Override
    public Map<String, Object> register(Advice children) {
        Map<String, Object> map = new HashMap<>();
        if(adviceMapper.selectById(children.getAdviceid()) != null){
            map.put("Msg", "医嘱编号重复!");
            return map;
        }
        int insert = adviceMapper.insert(children);
        if(insert > 0 ){
            map.put("Msg", "添加成功!");
            return map;
        }else{
            map.put("Msg", "注册失败!");
            return map;
        }
    }
    @Override
    public List<Advice> findByCondition(Advice record) {
        return adviceMapper.findByCondition(record);
    }

    @Override
    public List<Advice> selectAll() {
        return adviceMapper.selectAll();
    }
    @Override
    public List<Advice> selectAll1() {
        return adviceMapper.selectAll1();
    }
    @Override
    public List<Advice> selectAll2() {
        return adviceMapper.selectAll2();
    }
    @Override
    public List<Advice> selectAll3() {
        return adviceMapper.selectAll3();
    }

    @Override
    public int deleteById(String adviceid) {
        return adviceMapper.deleteById(adviceid);
    }

    @Override
    public Advice insert(Advice record) {
        adviceMapper.insert(record);
        return record;
    }

    @Override
    public Advice selectById(String adviceid) {
        return adviceMapper.selectById(adviceid);
    }

    @Override
    public Advice selectByDId(String doctorid) {
        return adviceMapper.selectByDId(doctorid);
    }

    @Override
    public Advice selectByCId(String childrenid) {
        return adviceMapper.selectByCId(childrenid);
    }

    @Override
    public int updateById(Advice record) {
        return adviceMapper.updateById(record);
    }
}
