"use client"
import { axiosClientInstance } from "@/lib/axios";

export const LogOut = async () => {
    const res = await axiosClientInstance.post("/staff/logout");

    if(res.status === 200) {
        localStorage.clear();
    }

}