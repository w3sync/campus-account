import { StudentRegisterForm } from '@/modules/student/ui/components/student-register-form'
import React, { Suspense } from 'react'

export default function StudentRegisterPage() {
    return (
        <Suspense fallback={"Loading ..."}>
            <StudentRegisterForm />
        </Suspense>
    )
}
