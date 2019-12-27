package com.welfare.entity;

import java.io.Serializable;

public class BaseDO implements Serializable{
    private static final long serialVersionUID = 1309462632051784926L;
    /**
     * 拓展字段
     */
    private String extendField;

    /**
     * 创建时间
     */
    private Long createTime;

    /**
     * 修改时间
     */
    private Long updateTime;

    /**
     * 版本号
     */
    private Integer version;

    /**
     * 是否生效
     */
    private Integer isVailed;
}
