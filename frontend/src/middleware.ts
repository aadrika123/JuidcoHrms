import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const tok3n = request.cookies.get("accesstoken")?.value;

  if (!tok3n) {
    return NextResponse.redirect(new URL("/hrms/auth/login", request.url));
  }
  if (
    request.url === "http://localhost:7000/" ||
    request.url === "http://localhost:7000/hrms"
  ) {
    return NextResponse.redirect(new URL("/hrms/ems/dashboard", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|johar.png|Juidco.png|Jhar_logo.png|favicon.ico|auth/login).*)",
  ],
};
