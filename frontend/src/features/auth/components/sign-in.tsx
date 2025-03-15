"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FormEvent, useState } from "react"
import { loginStaff } from "../actions/login"
import { useAuthContext } from "../hooks/use-auth-context"
import { redirect, useRouter } from "next/navigation"

interface IUser {
  username: string;
  password: string;
}

export const SignIn = () => {

  const { user, handleAuth } = useAuthContext();
  const router = useRouter()

  const [data, setData] = useState<IUser>({
    username: "campus.ankan.kanaki",
    password: "Campus@1234"
  })

  const signInHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await loginStaff(
      data
    )
    handleAuth(res);
    router.push('/');
  }

  return (
    <form
      onSubmit={signInHandler}
      className="flex flex-col gap-10 bg-amber-400 w-md py-4 rounded-md p-2"
    >
      <div className="flex justify-center">
        <h1 className="text-xl">WellCome Back</h1>
      </div>

      <div className="flex flex-col gap-2">
        <Input
          type="text"
          className="p-6 border-amber-500 focus:outline-none focus-visible:ring-transparent"
          placeholder="Campus Id"
          value={data.username}
          onChange={e => setData(d => ({
            ...d,
            username: e.target.value
          }))}
        />
        <Separator />
        <Input
          type="password"
          className="p-6 border-amber-500 focus:outline-none focus-visible:ring-transparent"
          placeholder="Password"
          value={data.password}
          onChange={e => setData(d => ({
            ...d,
            password: e.target.value
          }))}
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
        >
          Sign In
        </Button>
      </div>
    </form>
  )
}