import { redirect } from 'next/navigation';

export async function POST(req) {
    return Response.redirect(new URL('/access', req.url), 303);
}