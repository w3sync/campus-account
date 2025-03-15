"use client"

import { useRouter } from "next/navigation";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextProps {
    user: {
        [key: string]: any;
    } | null;
    handleAuth: (data: any) => void;
    isPending: boolean;
    setPending: (state: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({
    children
}: AuthProviderProps) => {

    const router = useRouter()
    const [user, setUser] = useState<AuthContextProps["user"] | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const handleAuth = (userData: any) => {
        console.log({ userData })
        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);
        setUser(userData.staff);
    }

    const setPending = (state: boolean): void => {
        setIsPending(state)
    }

    return <AuthContext.Provider value={{ user, handleAuth, isPending, setPending }}>
        {children}
    </AuthContext.Provider>
} 