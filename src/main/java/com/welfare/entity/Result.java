package com.welfare.entity;

import lombok.Data;

@Data
public class Result {
    private Boolean result;

    public Result(Boolean result) {
        this.result = result;
    }
}
