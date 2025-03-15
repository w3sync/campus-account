"use client";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FlameIcon, HomeIcon, PlaySquareIcon } from "lucide-react";
import Link from "next/link";

const items = [
    {
        title: "Home",
        url: "/",
        icon: HomeIcon,
    },
    {
        title: "Department",
        url: "/department",
        icon: PlaySquareIcon,
        auth: true,
    },
    {
        title: "Fee",
        url: "/fee",
        icon: FlameIcon,
    },
];

export const MainSection = () => {

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {
                        items.map(item => (
                            <SidebarMenuItem
                                key={item.title}
                            >
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    asChild
                                    isActive={false}
                                    className="h-10 bg-amber-300 hover:bg-amber-500"
                                >
                                    <Link href={item.url} className="flex items-center gap-4">
                                        <item.icon
                                        />
                                        <span className="text-sm">
                                            {item.title}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))
                    }
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
