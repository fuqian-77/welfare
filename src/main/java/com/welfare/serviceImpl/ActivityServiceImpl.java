package com.welfare.serviceImpl;

import com.welfare.dao.ActivityMapper;
import com.welfare.entity.Activity;
import com.welfare.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ActivityServiceImpl implements ActivityService {
    @Autowired
    private ActivityMapper activityMapper;

    @Override
    public List<Activity> selectAll() {
        return activityMapper.selectAll();
    }

    @Override
    public List<Activity> selectAll1() {
        return activityMapper.selectAll1();
    }
    @Override
    public List<Activity> selectAll2() {
        return activityMapper.selectAll2();
    }

    @Override
    public List<Activity> selectAll4() {
        return activityMapper.selectAll4();
    }

    @Override
    public List<Activity> selectAll3() {
        return activityMapper.selectAll3();
    }
    @Override
    public int deleteById(Integer activityid) {
        return activityMapper.deleteById(activityid);
    }

    @Override
    public Activity insert(Activity record) {
        activityMapper.insert(record);
        return record;
    }

    @Override
    public List<Activity> selectByUId(Activity record) {
        return activityMapper.selectByUId(record);
    }
    @Override
    public Activity selectById(Integer record) {
        return activityMapper.selectById(record);
    }

    @Override
    public int updateById(Activity record) {
        return activityMapper.updateById(record);
    }


}
