"use server"


export const registerNewStudent = async (userData: any) => {
    const res = await fetch("http://localhost:8000/api/v1/student/register", {
        method: "POST",
        body: userData
    })
}