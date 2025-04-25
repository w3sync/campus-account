"use client"

import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
export const DashboardNavbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-12 bg-amber-400 flex items-center px-2 pr-5 z-10">
            <div className="flex items-center gap-4 w-full">
                {/* MEnu and Logo */}

                <div className="flex items-center flex-shrink-0">
                    <SidebarTrigger />
                    <Link href={"/dashboard/admin"}>
                        <div className="p-4 flex items-center gap-1">
                            <Image src={"/globe.svg"} height={25} width={25} alt="logo" />
                            <p className="text-xl font-semibold tracking-tight">Campus</p>
                        </div>
                    </Link>
                </div>

                {/* Search Bar */}

                <div className="flex-1 flex justify-center max-w-[720px]  mx-auto">
                </div>

                <div className="flex-shrink-0 items-center flex gap-4">
                </div>
            </div>
        </nav>
    );
};
