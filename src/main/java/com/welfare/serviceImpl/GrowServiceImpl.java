package com.welfare.serviceImpl;

import com.welfare.dao.ChildrenMapper;
import com.welfare.dao.GrowMapper;
import com.welfare.entity.Children;
import com.welfare.entity.Grow;
import com.welfare.service.ChildrenService;
import com.welfare.service.GrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GrowServiceImpl implements GrowService {
    @Autowired
    private GrowMapper growMapper;

    @Override
    public Map<String, Object> register(Grow grow) {
        Map<String, Object> map = new HashMap<>();
        if(growMapper.selectById(grow.getGrowid()) != null){
            map.put("Msg", "编号重复!");
            return map;
        }
        int insert = growMapper.insert(grow);
        if(insert > 0 ){
            map.put("Msg", "添加成功!");
            return map;
        }else{
            map.put("Msg", "注册失败!");
            return map;
        }
    }

    @Override
    public List<Grow> selectAll() {
        return growMapper.selectAll();
    }

    @Override
    public List<Grow> selectAll1() {
        return growMapper.selectAll1();
    }

    @Override
    public List<Grow> selectAll2() {
        return growMapper.selectAll2();
    }

    @Override
    public List<Grow> findByCondition(Grow record) {
        return growMapper.findByCondition(record);
    }
    @Override
    public int deleteById(String growid) {
        return growMapper.deleteById(growid);
    }

    @Override
    public int deleteByCId(String childrenid) {
        return growMapper.deleteByCId(childrenid);
    }

    @Override
    public Grow insert(Grow record) {
        growMapper.insert(record);
        return record;
    }

    @Override
    public Grow selectById(String growid) {
        return growMapper.selectById(growid);
    }

    @Override
    public int updateById(Grow record) {
        return growMapper.updateById(record);
    }

}
