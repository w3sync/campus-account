import { Navbar } from "@/components/navbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Sidebarlayout } from "@/features/home/components/sidebar"

interface HomeLayoutProps {
    children: React.ReactNode
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <SidebarProvider>
            <div className="w-full">
                <Navbar />

                <div
                    className="flex min-h-screen"
                >
                    <Sidebarlayout />
                    <main
                        className="flex-1 overflow-y-auto"
                    >
                        {
                            children
                        }
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}