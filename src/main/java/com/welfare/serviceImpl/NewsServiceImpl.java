package com.welfare.serviceImpl;


import com.welfare.dao.AdviceMapper;
import com.welfare.dao.NewsMapper;
import com.welfare.entity.Advice;
import com.welfare.entity.News;
import com.welfare.service.AdviceService;
import com.welfare.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private NewsMapper adviceMapper;

    @Override
    public List<News> findByCondition(News record) {
        return adviceMapper.findByCondition(record);
    }

    @Override
    public List<News> selectAll() {
        return adviceMapper.selectAll();
    }


    @Override
    public int deleteById(Integer newid) {
        return adviceMapper.deleteByPrimaryKey(newid);
    }

    @Override
    public News insert(News record) {
        adviceMapper.insert(record);
        return record;
    }

    @Override
    public News selectById(Integer newid) {
        return adviceMapper.selectByPrimaryKey(newid);
    }

    @Override
    public News selectByTitle(String title) {
        return adviceMapper.selectByTitle(title);
    }

    @Override
    public int updateById(News record) {
        return adviceMapper.updateByPrimaryKey(record);
    }

    @Override
    public int updateByTitle(News record) {
        return adviceMapper.updateByTitle(record);
    }
}
