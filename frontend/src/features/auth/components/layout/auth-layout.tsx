
interface AuthLayoutProps {
    children: React.ReactNode
}

export const AuthLayout = (
    { children }: AuthLayoutProps
) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            {children}
        </div>
    )
}