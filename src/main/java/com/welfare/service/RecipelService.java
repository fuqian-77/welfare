package com.welfare.service;

import com.welfare.entity.Advice;
import com.welfare.entity.Recipel;

import java.util.List;
import java.util.Map;

public interface RecipelService {


    List<Recipel> selectAll();

    List<Recipel> selectAll1();

    List<Recipel> selectAll2();

    int deleteById(String adviceid);

    Recipel insert(Recipel record);

    Recipel selectById(String adviceid);

    int updateById(Recipel record);

}
