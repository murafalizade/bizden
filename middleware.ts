import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {jwtDecoder, routeAccessController} from "@shared/libs/helpers";
import {CookieManager} from "@shared/libs/cookieManager";

export async function middleware(req: NextRequest) {
    const token = await CookieManager.getCookie();
    const url = req.nextUrl.clone();

    if (!token) {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    const user = jwtDecoder(token);
    if (!user) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    const path = req.nextUrl.pathname;
    const role = (user as any).role;

    if (!routeAccessController(path, role)) {
        url.pathname = '/unauthorized';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
