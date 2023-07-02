import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

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

export default async function middleware(req: NextRequest) {
  // const domain = process.env.DOMAIN!;

  // const hostname = req.headers.get("host")!;

  const url = req.nextUrl;

  // console.log(hostname);

  // if (hostname.startsWith("localhost")) {
  //   return NextResponse.redirect("http://hello.localhost:3000");
  // }

  // const subdomain =
  //   hostname === domain ? "" : hostname.replace(`.${domain}`, "");

  // console.log(subdomain);
  // console.log(domain);
  // if (!hostname.includes(domain)) {
  //   url.pathname = "/404";
  //   return NextResponse.rewrite(url);
  // }
  // if (subdomain === "" || subdomain === "www") {
  //   url.pathname = "/main" + url.pathname;
  //   return NextResponse.rewrite(url);
  // } else if (subdomain === "auth") {
  //   url.pathname = "/auth" + url.pathname;
  //   return NextResponse.rewrite(url);
  // }

  // url.pathname = "/subdomains/" + subdomain + url.pathname;

  // console.log(url.href);
  url.pathname = "/about";

  return NextResponse.rewrite(url);
}
