import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { MainSection } from "./layout/main-section";

interface SidebarlayoutProps {
    children?: React.ReactNode;
}

export const Sidebarlayout = ({ children }: SidebarlayoutProps) => {
    return (
        <Sidebar className="mt-14 z-40 border-none">
            {/* <SidebarHeader /> */}
            <SidebarContent>
                <SidebarGroup />
                <MainSection />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}