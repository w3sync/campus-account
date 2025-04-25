import { StaffRegisterForm } from '@/modules/staff/ui/components/staff-register-form'
import { Suspense } from 'react'

export default function Page() {
    return (
        <Suspense fallback={"Loading ..."}>
            <StaffRegisterForm />
        </Suspense>
    )
}
