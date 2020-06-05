package com.welfare.dao;

import com.welfare.entity.Reject;
import com.welfare.entity.RejectKey;

import java.util.List;

public interface RejectMapper {

        int deleteByPrimaryKey(Integer rejectid);

        int insert(Reject record);

        List<Reject> selectAllr();//recruit
        Reject selectr(RejectKey key);

        List<Reject> selectAlla(); //apply

        Reject selectByPrimaryKey(Integer rejectid);

        int updateByPrimaryKey(Reject record);
}
