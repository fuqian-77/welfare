package com.welfare.service;

import com.welfare.entity.Reject;
import com.welfare.entity.RejectKey;

import java.util.List;

public interface RejectService {


    //查询被拒绝的寄养申请
    List<Reject> selectAlla();

    //查询被拒绝的活动申请
    List<Reject> selectAllr();

    int deleteById(Integer rejectid);

    Reject insert(Reject record);

    Reject selectById(Integer rejectid);

    Reject selectr(RejectKey key);

    int updateById(Reject record);

}
