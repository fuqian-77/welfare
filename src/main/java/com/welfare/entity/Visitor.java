package com.welfare.entity;

import lombok.Data;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data

public class Visitor {
    private Integer visitorid;

    private String name;

    private Integer age;

    private String sex;

    private String starttime;

    private String endtime;

    private String phone;

    private String aim;

    private String recordid;

    private String cardid;

    private String note;

//    public String getStarttime() {
//        String value = null;
//        //将Date类型的时间转换成指定格式的字符串
//        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        value = dateFormat.format(starttime);
//        return value;
//    }
//
//    public void setStarttime(String starttime) {
//        //将字符串类型的日期转换成Date类型的指定格式的日期
//        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        ParsePosition pos = new ParsePosition(0);//从第一个字符开始解析
//        this.starttime = f.parse(starttime, pos);/*对参数msg_create_date（String类型）从第一个字符开始解析（由pos），转换成java.util.Date类型，
//    而这个Date的格式为"yyyy-MM-dd"（因为SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");）*/
//    }
//
//    public String getEndtime() {
//        String value = null;
//        //将Date类型的时间转换成指定格式的字符串
//        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        value = dateFormat.format(endtime);
//        return value;
//    }
//
//    public void setEndtime(String endtime) {
//        //将字符串类型的日期转换成Date类型的指定格式的日期
//        SimpleDateFormat f = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        ParsePosition pos = new ParsePosition(0);//从第一个字符开始解析
//        this.endtime = f.parse(endtime, pos);/*对参数msg_create_date（String类型）从第一个字符开始解析（由pos），转换成java.util.Date类型，
//    而这个Date的格式为"yyyy-MM-dd"（因为SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");）*/
//    }
}