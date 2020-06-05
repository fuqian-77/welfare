package com.welfare.serviceImpl;

import com.welfare.dao.VisitorMapper;
import com.welfare.entity.VisitResult;
import com.welfare.entity.Visitor;
import com.welfare.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VisitorServiceImpl implements VisitorService {
    @Autowired
    private VisitorMapper visitorMapper;



    @Override
    public List<Visitor> selectAll() {
        return visitorMapper.selectAll();
    }

    @Override
    public int deleteById(Integer visitorid) {
        return visitorMapper.deleteByPrimaryKey(visitorid);
    }

    @Override
    public Map<String, Object> register(Visitor visitor) {
        Map<String, Object> map = new HashMap<>();
        if(visitorMapper.selectByPrimaryKey(visitor.getVisitorid()) != null){
            map.put("Msg", "编号重复!");
            return map;
        }
//        if(visitor.getVisitorid()== null || visitor.getVisitorid()==""){
//            map.put("Msg", "请输入编号!");
//            return map;
//        }
//        if(visitor.getName()== null || visitor.getName()==""){
//            map.put("Msg", "请输入拜访人姓名!");
//            return map;
//        }
        int insert = visitorMapper.insert(visitor);
        if(insert > 0 ){
            map.put("Msg", "添加成功!");
            return map;
        }else{
            map.put("Msg", "添加失败!");
            return map;
        }
    }


    @Override
    public Visitor selectById(Integer visitorid) {
        return visitorMapper.selectByPrimaryKey(visitorid);
    }

    @Override
    public Visitor selectByName(String name) {
        return visitorMapper.selectByName(name);
    }

    @Override
    public Visitor insert(Visitor record) {
         visitorMapper.insert(record);
        return record;
    }

    @Override
    public int updateById(Visitor record) {
        return visitorMapper.updateByPrimaryKey(record);
    }
    @Override
    public List<Visitor> findByCondition(Visitor record) {
        return visitorMapper.findByCondition(record);
    }

    @Override
    public int visitNum(Visitor record) {
        return visitorMapper.visitNum(record);
    }

    @Override
    public List<VisitResult> childrenNum(Visitor record) {
        return  visitorMapper.childrenNum(record);
    }

}
