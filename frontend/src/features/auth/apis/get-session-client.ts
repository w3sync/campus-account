import { axiosClientInstance } from "@/lib/axios";

let user: null | { [key: string]: any } = null;

export const getSessionClient = async () => {

    if(user) {
        return user;
    }

    try {
        const { data } = await axiosClientInstance.get("/staff/me");

        user = data.data.staff

        return data.data
    } catch (error) {
        throw new Error(`Unauthorize Credentials ${error}`)
    }
}