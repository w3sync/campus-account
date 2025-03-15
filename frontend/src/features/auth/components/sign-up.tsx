import Link from "next/link"

export const SignUp = () => {
  return (
    <form
      className="bg-amber-400 w-lg py-2 rounded-md p-1"
    >
      <div className="p-2">
        <h1 className="text-xl mb-2 border-b border-amber-900">Kindly Login In</h1>
        <p className="text-right mr-8">If your are not admin. Please inform your admin and register yourself.</p>
        <Link href={'/sign-in'} className="text-blue-500 underline">Sign In</Link>
      </div>
    </form>
  )
}