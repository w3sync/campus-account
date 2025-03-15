"use client"

import { axiosClientInstance } from "@/lib/axios";

interface LoginData {
  username: string;
  password: string;
}

export const loginStaff = async ({ username, password }: LoginData): Promise<void> => {

  if (username === "" || password === "") {
    throw new Error("id && pass can't be empty")
  }

  // Client Axios Handler
  const { data } = await axiosClientInstance.post("/staff/login", {
    username,
    password
  });

  return data.data;
};
