import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecoder, routeAccessController} from "@shared/libs/helpers";
import {ServerCookieManager} from "@shared/libs/cookie-manager/server-cookie-manager";
import {IJwtPayload} from "@shared/libs/models";

export async function middleware(req: NextRequest) {
    const token = await ServerCookieManager.getCookie();
    const url = req.nextUrl.clone();

    if (!token) {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const user: IJwtPayload = jwtDecoder(token)!;
    if (!user) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    const path = req.nextUrl.pathname;
    const role = user.role;

    if (!routeAccessController(path, role)) {
        url.pathname = '/unauthorized';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
