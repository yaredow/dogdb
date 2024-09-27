import { NextRequest, NextResponse } from "next/server";
import { JWTPayload, jwtVerify } from "jose";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
} from "@/routes";
import { getTokens } from "./lib/cookie";
import { redirect } from "next/navigation";
import { EXPRESS_URL } from "./lib/constants";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "";
const REFRESH_THRESHOLD = 2 * 60; // 2 minutes in seconds

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const { accessToken, refreshToken } = getTokens();
  let isLoggedIn = false;
  let payload: JWTPayload | null = null;

  // Verify access token and check if it needs refreshing
  if (accessToken) {
    try {
      const { payload: decodedPayload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(JWT_ACCESS_SECRET),
      );
      payload = decodedPayload;
      isLoggedIn = !!payload.id;

      // Check if token is about to expire (within 2 minutes)
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      const expirationTime = payload.exp || 0;

      if (expirationTime - currentTime < REFRESH_THRESHOLD && refreshToken) {
        const tokenRefreshUrl = new URL(
          `${EXPRESS_URL}/api/v1/user/refresh-token/${refreshToken}`,
          req.url,
        );
        return NextResponse.redirect(tokenRefreshUrl);
      }
    } catch (error) {
      console.error("Token verification error:", error);
      isLoggedIn = false;
      redirect("/auth/signin");
    }
  }

  // Handling API authentication routes
  const isApiAuthRoute = apiAuthPrefix.some((apiPrefix) =>
    nextUrl.pathname.startsWith(apiPrefix),
  );

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Handling public routes
  const isPublicRoute = publicRoutes.some((publicRoute) => {
    if (publicRoute.endsWith("*")) {
      const baseRoute = publicRoute.slice(0, -1);
      return nextUrl.pathname.startsWith(baseRoute);
    }
    return nextUrl.pathname === publicRoute;
  });

  // Handling authenticated routes
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
