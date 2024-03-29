package com.dreamfactory.entity;

import com.alibaba.fastjson2.JSONObject;
import com.alibaba.fastjson2.JSONWriter;

public record RestBean<T> (int code, T data, String message) {

    public static <T> RestBean<T> success(T data) {
        return new RestBean<>(200, data, "Request success");
    }
    public static <T> RestBean<T> success() {
        return success(null);
    }

    public static <T> RestBean<T> unAuthorized(String message) {
        return new RestBean<>(401, null, message);
    }

    public static <T> RestBean<T> forbidden(String message) {
        return new RestBean<>(403, null, message);
    }

    public static <T> RestBean<T> failure(int code, String message) {
        return new RestBean<>(code, null, message);
    }

    public String asJsonString() {
        return JSONObject.toJSONString(this, JSONWriter.Feature.WriteNulls);
    }

}
