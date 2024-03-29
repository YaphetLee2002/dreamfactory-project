"use client"

import axios, {AxiosResponse} from "axios";
import { toast } from "@/components/ui/use-toast"
import {store} from "next/dist/build/output/store";
import api from "@/net/api";
import {router} from "next/client";

const authItemName = "access_token"
// const {toast} = useToast()

const accessHeader = () => {
    const token = takeAccessToken()
    return token? {
        'Authorization': `Bearer ${token}`
    } : {}
}

const defaultFailure = (message: string, code: number, url: string) => {
    toast({
        title: message,
        description: "Please try again or reset your password.",
        variant: "warning"
    })
}

const defaultError = (err: any) => {
    console.error(err)
    toast({
        title: "Something went wrong. Please contact the administrator.",
        variant: "error"
    })
}

function takeAccessToken() {
    const authObjStr = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName)
    if (authObjStr === null) {
        return null
    } else {
        const authObj = JSON.parse(authObjStr)
        if (authObj.expireTime <= new Date()) {
            deleteAccessToken()
            toast({
                title: "Your login status has expired. Please log in again.",
                variant: "info"
            })
            return null
        }
        return authObj.token
    }
}

function storeAccessToken(token: string, remember: boolean, expireTime: number) {
    // authObj是一个对象，包含了token和expireTime两个属性
    // 如果用户选择了记住登录状态，将authObj存储到localStorage中
    // 否则存储到sessionStorage中
    const authObj = {
        token: token,
        expireTime: expireTime,
    }
    const authObjStr = JSON.stringify(authObj)
    if (remember) {
        localStorage.setItem(authItemName, authObjStr)
    } else {
        sessionStorage.setItem(authItemName, authObjStr)
    }
}

function deleteAccessToken() {
    localStorage.removeItem(authItemName)
    sessionStorage.removeItem(authItemName)
}

function internalPost(
    url: string,
    data: any,
    header: any,
    success: (data: any) => void,
    failure: (message: string, code: number, url: string) => void,
    error = defaultError
) {
    api.post(url, data, { headers: header })
        .then((response) => {
            const responseData = response.data
            if (responseData.code === 200) {
                success(responseData.data)
            } else {
                failure(responseData.message, responseData.code, responseData.url)
            }
        }).catch(err => error(err))
}

function internalGet(
    url: string,
    header: any,
    success: (data: any) => void,
    failure: (message: string, code: number, url: string) => void,
    error = defaultError
) {
    api.get(url, { headers: header })
        .then((response) => {
            const responseData = response.data
            if (responseData.code === 200) {
                success(responseData.data)
            } else {
                failure(responseData.message, responseData.code, url)
            }
        }).catch(err => error(err))
}

function getWithToken(
    url: string,
    success: (data: any) => void,
    failure = defaultFailure
) {
    internalGet(url, accessHeader(), success, failure)
}

function postWithToken(
    url: string,
    data: any,
    success: (data: any) => void,
    failure = defaultFailure
) {
    internalPost(url, data, accessHeader(), success, failure)
}

function login(
    username: string,
    password: string,
    remember: boolean,
    success: (data: any) => void,
    failure = defaultFailure
) {
    internalPost('/api/auth/login', {
        username: username,
        password: password,
    }, {
        'Content-Type': 'application/x-www-form-urlencoded',
    }, (data) => {
        storeAccessToken(data.token, remember, data.expireTime)
        success(data)
    }, failure)
}

function logout(
    success: () => void,
    failure = defaultFailure
) {
    getWithToken('/api/auth/logout', () => {
        deleteAccessToken()
        toast({
            title: "Logout successfully.",
            variant: "success"
        })
        success()
    }, failure)
}

function getUsername(
    success: (data: any) => void,
    failure=defaultFailure
) {
    getWithToken('/api/test/username', success, failure)
}

function isAuthorized() {
    return takeAccessToken() !== null
}

export { login, logout, getUsername, isAuthorized }