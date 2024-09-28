// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers'

const SECRET_KEY = 'key'; // Use the same secret key as in your Express server

export async function middleware(request) {
    let path = request.nextUrl.pathname;
    let token = request.cookies.get('token'); // Get the token from cookies
    // Define paths that do not require authentication
    const publicPaths = ['/'];

    // Check if the request path is public or if the token exists
    if (!publicPaths.includes(request.nextUrl.pathname) && !token) {
        // If no token, redirect to login page
        return NextResponse.redirect(new URL('/', request.url));
    }
    // Optionally verify the token here
    if (token) {
        try {
            // Verify the token (this step is optional based on your needs)
            const {payload} = await jwtVerify(token['value'], new TextEncoder().encode(SECRET_KEY));
            if(path!==`/${payload['data']['type']}_home`){
                return NextResponse.redirect(new URL(`/${payload['data']['type']}_home`, request.url));
            }
        } catch (error) {
            console.log(error)
            // If verification fails, redirect to login page
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Continue to the requested page if authenticated
    return NextResponse.next();
}

// Configure which paths this middleware should apply to
export const config = {
    matcher: ['/type_1_home', '/type_2_home'], // Apply middleware to protected routes
};