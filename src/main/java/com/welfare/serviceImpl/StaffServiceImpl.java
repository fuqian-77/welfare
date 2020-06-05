package com.welfare.serviceImpl;

import com.welfare.dao.StaffMapper;
import com.welfare.entity.Staff;
import com.welfare.service.StaffService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    private StaffMapper staffMapper;

    @Override
    public Map<String, Object> login(String staffid, String password) {
        Map<String, Object> map = new HashMap<>();

        // 空值处理
        if (StringUtils.isBlank(staffid)) {
            map.put("staffidMsg", "账号不能为空!");
            return map;
        }
        if (StringUtils.isBlank(password)) {
            map.put("passwordMsg", "密码不能为空!");
            return map;
        }

        // 验证账号
        Staff staff = staffMapper.selectById(staffid);
        if (staff == null) {
            map.put("staffidMsg", "该账号不存在!");
            return map;
        }

        // 验证密码
        if (!staff.getPassword().equals(password)) {
            map.put("passwordMsg", "密码不正确!");
            return map;
        }
        return map;
    }


    @Override
    public Map<String, Object> register(Staff staff) {
        Map<String, Object> map = new HashMap<>();
        if(staffMapper.selectById(staff.getStaffid()) != null){
            map.put("Msg", "职工编号重复!");
            return map;
        }
        if(staffMapper.selectByName(staff.getName()) != null){
            map.put("Msg", "用户名重复!");
            return map;
        }
        int insert = staffMapper.insert(staff);
        if(insert > 0 ){
            map.put("Msg", "添加成功!");
            return map;
        }else{
            map.put("Msg", "注册失败!");
            return map;
        }
    }

    @Override
    public List<Staff> selectAll() {
        return staffMapper.selectAll();
    }
    @Override
    public List<Staff> findByCondition(Staff record) {
        return staffMapper.findByCondition(record);
    }

    @Override
    public int deleteById(String staffid) {
        return staffMapper.deleteById(staffid);
    }

    @Override
    public Staff insert(Staff record) {
        staffMapper.insert(record);
        return record;
    }

    @Override
    public Staff selectById(String staffid) {
        return staffMapper.selectById(staffid);
    }

    @Override
    public int updateById(Staff record) {
        return staffMapper.updateById(record);
    }

    @Override
    public int updateByName(Staff record) {
        return staffMapper.updateById(record);
    }
}
