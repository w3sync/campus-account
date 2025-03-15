import { UserIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SidebarTrigger } from "./ui/sidebar"
import Link from "next/link"
import { SearchBar } from "@/features/home/components/search-bar"
import { AuthAvatar } from "@/features/auth/components/auth-avatar"
import { getSession } from "@/features/auth/apis/get-session"

export const Navbar = async () => {

    const user = await getSession()

    return (
        <nav
            className="flex justify-between px-5 py-1.5 bg-red-400 items-center"
        >
            <div className="flex items-center gap-2">
                <SidebarTrigger
                    className="hover:bg-transparent cursor-pointer"
                />

                <Link href={`/`}>
                    <span
                        className="text-lg font-bold cursor-pointer"
                    >
                        Campus
                    </span>
                </Link>
            </div>

            <div>
                <SearchBar />
            </div>

            <div>
                <AuthAvatar 
                    user={user}
                />
            </div>
        </nav>
    )
}