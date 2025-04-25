import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardNavbar } from "../components/dashboard-navbar/navbar";
import { DashboardSidebar } from "../components/dashboard-sidebar";


interface HomeLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout = async ({ children }: HomeLayoutProps) => {
    return (
        <SidebarProvider>
            <div className="w-full">
                <DashboardNavbar />
                <div className="flex min-h-screen pt-[4rem]">
                    <DashboardSidebar />

                    <main className="flex-1 overflow-y-auto">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
};
