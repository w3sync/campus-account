"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenubarShortcut } from "@/components/ui/menubar";
import { User } from "../types";
import { useState } from "react";
import { LogOut } from "../actions/logout";
import { redirect } from "next/navigation";
import { useAuthContext } from "../hooks/use-auth-context";

interface AuthAvatarProps {
    user: User;
}

export const AuthAvatar = ({ user }: AuthAvatarProps) => {
    if (!user) return null;

    const [isOpen, setIsOpen] = useState(false)
    const {handleAuth} = useAuthContext()

    const handleLogout = async () => {
        await LogOut()
        handleAuth({});
        redirect('/sign-in')
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
                asChild
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <Avatar>
                    <AvatarImage src={user?.photo} />
                    <AvatarFallback className="text-amber-700 cursor-pointer">
                        {user.firstName.charAt(0).toUpperCase() +
                            user.lastName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-52 relative right-10 p-2 text-md "
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <DropdownMenuItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>New Window</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 font-light text-md">Log Out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
