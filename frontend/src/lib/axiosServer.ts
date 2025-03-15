"use server"

import axios, { InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const axiosServerInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    withCredentials: true
});

// ✅ Attach accessToken from cookies to each request
axiosServerInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig<any>) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => Promise.reject(error));

// ✅ Handle token refresh when accessToken expires
axiosServerInstance.interceptors.response.use((res) => res, async (err) => {
    const orgReq = err.config || {};

    if (err.response?.status === 401 && orgReq && !orgReq._retry) {
        if (isRefreshing) {
            return new Promise((resolve) => {
                refreshSubscribers.push(token => {
                    orgReq.headers["Authorization"] = `Bearer ${token}`;
                    resolve(axiosServerInstance(orgReq));
                });
            });
        }

        orgReq._retry = true;
        isRefreshing = true;

        try {
            const cookieStore = await cookies();
            const refreshToken = cookieStore.get("refreshToken")?.value;

            if (!refreshToken) {
                throw new Error("+ No Refresh token available");
            }

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/staff/refresh`, { refreshToken });

            // ✅ Update access token in cookies
            const response = NextResponse.next();
            response.headers.append(
                "Set-Cookie",
                `accessToken=${data.accessToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=900`
            );

            refreshSubscribers.forEach(callback => callback(data.accessToken));
            refreshSubscribers = [];

            return axiosServerInstance(orgReq);
        } catch (error) {
            console.error("Token refresh failed", error);

            // ✅ Clear cookies and force logout
            const response = NextResponse.redirect("localhost:3000/sign-in");
            // response.headers.append("Set-Cookie", "accessToken=; HttpOnly; Path=/; Max-Age=0");
            // response.headers.append("Set-Cookie", "refreshToken=; HttpOnly; Path=/; Max-Age=0");
            return response;
        } finally {
            isRefreshing = false;
        }
    }

    return Promise.reject(err);
});

export { axiosServerInstance };
