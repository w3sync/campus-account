"use server"

import { axiosServerInstance } from "@/lib/axiosServer";

let user: null | { [key: string]: any } = null;

export const getSession = async () => {

    if (user !== null) {
        return user;
    }

    try {
        const { data } = await axiosServerInstance.get("/staff/me");

        user = data.data;

        return data.data
    } catch (error) {
        throw new Error(`Unauthorize Credentials ${error}`)
    }
}