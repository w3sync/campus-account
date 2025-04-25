import { DashboardLayout } from "@/modules/dashboard/ui/layouts/dashboard-layout"
import { ReactNode } from "react"

interface DashboardLayoutProps {
    children: ReactNode
}

export default function Layout({ children }: DashboardLayoutProps) {
    return (
        <DashboardLayout>{children}</DashboardLayout>
    )
}