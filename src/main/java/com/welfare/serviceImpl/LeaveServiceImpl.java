package com.welfare.serviceImpl;

import com.welfare.dao.GrowMapper;
import com.welfare.dao.LeaveMapper;
import com.welfare.entity.Grow;
import com.welfare.entity.Leave;
import com.welfare.service.GrowService;
import com.welfare.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LeaveServiceImpl implements LeaveService {
    @Autowired
    private LeaveMapper leaveMapper;

    @Override
    public Map<String, Object> register(Leave leave) {
        Map<String, Object> map = new HashMap<>();
        if(leaveMapper.selectByCId(leave.getChildrenid()) != null){
            map.put("Msg", "该儿童已出院，请重新选择!");
            return map;
        }
        int insert = leaveMapper.insert(leave);
        if(insert > 0 ){
            map.put("Msg", "添加成功!");
            return map;
        }else{
            map.put("Msg", "注册失败!");
            return map;
        }
    }

    @Override
    public List<Leave> selectAll() {
        return leaveMapper.selectAll();
    }

    @Override
    public List<Leave> selectAll1() {
        return leaveMapper.selectAll1();
    }

    @Override
    public List<Leave> selectAll2() {
        return leaveMapper.selectAll2();
    }

    @Override
    public List<Leave> findByCondition(Leave record) {
        return leaveMapper.findByCondition(record);
    }

    @Override
    public int deleteById(String childrenid) {
        return leaveMapper.deleteById(childrenid);
    }

    @Override
    public Leave insert(Leave record) {
        leaveMapper.insert(record);
        return record;
    }

    @Override
    public Leave selectById(String leaveid) {
        return leaveMapper.selectById(leaveid);
    }

    @Override
    public Leave selectByCId(String childrenid) {
        return leaveMapper.selectByCId(childrenid);
    }

    @Override
    public int updateById(Leave record) {
        return leaveMapper.updateById(record);
    }

}
