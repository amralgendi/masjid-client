import { NEXT_BUILTIN_DOCUMENT } from "next/dist/shared/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import Constants from "./constants";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /examples (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|examples/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req) {
  console.log("Constants", Constants);
  const domain =
    process.env.NODE_ENV == "development"
      ? "hello.localhost:3000"
      : process.env.DOMAIN;

  const url = req.nextUrl;

  console.log("URL: ", url.pathname);

  const hostname = req.headers.get("host");

  if (process.env.NODE_ENV) {
    if (hostname === "localhost:3000")
      return NextResponse.redirect("hello.localhost:3000");
  }

  const subdomain =
    hostname === domain ? "" : hostname.replace(`.${domain}`, "");

  if (!hostname.includes(domain)) {
    url.pathname = "/404";
  } else if (subdomain === "" || subdomain === "www") {
    url.pathname = "/main" + url.pathname;
  } else if (subdomain === "auth") {
    url.pathname = "/auth" + url.pathname;
  } else
    url.pathname =
      "/_subdomains/" +
      subdomain +
      "/" +
      (url.pathname === "/" ? "" : url.pathname);

  return NextResponse.rewrite(url);
}
