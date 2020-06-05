package com.welfare.service;

import com.welfare.entity.Children;
import com.welfare.entity.News;

import java.util.List;
import java.util.Map;

public interface NewsService {


    //查询全部活动
    List<News> selectAll();

    List<News> findByCondition(News record);

    int deleteById(Integer newid);

    News insert(News record);

    News selectById(Integer newid);

    News selectByTitle(String title);

    int updateById(News record);

    int updateByTitle(News record);
}
