import axios, { InternalAxiosRequestConfig } from "axios";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const axiosClientInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    withCredentials: true
});

axiosClientInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig<any>) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`
    }

    return config;
}, (error) => Promise.reject(error));

axiosClientInstance.interceptors.response.use((res) => res, async (err) => {
    const orgReq = err.config || {};

    if (err.response?.status === 401 && orgReq && !orgReq._retry) {
        if (isRefreshing) {
            return new Promise((resolve) => {
                refreshSubscribers.push(token => {
                    orgReq.headers["Authorization"] = `Bearer ${token}`
                    resolve(axios(orgReq));
                })
            })
        }
    }

    orgReq._retry = true;
    isRefreshing = true;

    try {

        const refreshToken = localStorage.getItem("refreshToken")

        if (!refreshToken) {
            throw new Error("No Refresh token avalilable")
        }

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_ENDPOINT}/staff/refresh`, { refreshToken })

        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)

        axiosClientInstance.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`
        refreshSubscribers.forEach(callback => callback(data.accessToken))
        refreshSubscribers = []

    } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = `/sign-in`; // Redirect to login
    } finally {
        isRefreshing = false;
    }

    return Promise.reject(err)
})

export { axiosClientInstance };
