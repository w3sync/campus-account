import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { MainSection } from "./main-section";
import { StudentSection } from "./student-section";
import { StaffSection } from "./staff-section";

export const DashboardSidebar = () => {
    return (
        <Sidebar className="mt-16 z-40 border-none " collapsible="icon">
            <SidebarContent className="bg-background">
                <MainSection />
                <Separator />
                <StudentSection />
                <Separator />
                <StaffSection />
                <Separator />
            </SidebarContent>
        </Sidebar>
    );
};
