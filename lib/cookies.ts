// lib/cookies.ts
import { IncomingMessage, ServerResponse } from 'http';
import cookie from 'cookie';

export function setCookie(res: ServerResponse, name: string, value: string, options: cookie.CookieSerializeOptions = {}): void {
    const cookieOptions: cookie.CookieSerializeOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // کوکی فقط در HTTPS
        maxAge: 60 * 60 * 24 * 7, // یک هفته
        path: '/',
        // sameSite: true,
        ...options,
    };

    res.setHeader('Set-Cookie', cookie.serialize(name, value, cookieOptions));
}
