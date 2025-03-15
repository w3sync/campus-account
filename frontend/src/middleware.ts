import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const { pathname } = url;
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    // 🚫 Prevent logged-in users from accessing /sign-in
    if (accessToken && pathname === "/sign-in") {
        console.log("Redirecting to home because user is already authenticated...");
        return NextResponse.redirect(new URL("/", req.nextUrl.origin));
    }

    // ✅ Allow unauthenticated users to access /sign-in
    if (!accessToken && pathname === "/sign-in") {
        console.log("Unauthenticated user, allowing access to sign-in page.");
        return NextResponse.next();
    }

    // ✅ Allow authenticated users to proceed to other pages
    if (accessToken) {
        return NextResponse.next();
    }

    // 🔄 Attempt to refresh token if refreshToken exists
    if (refreshToken) {
        try {
            const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/staff/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
                credentials: "include",
            });

            if (refreshResponse.ok) {
                return NextResponse.next();
            }
        } catch (error) {
            console.error("Token refresh failed", error);
        }
    }

    // ❌ Redirect unauthenticated users to /sign-in for all other routes
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl.origin));
}

// ✅ Protect all pages except public assets
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api).*)"
    ],
};
