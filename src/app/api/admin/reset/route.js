import { exec } from 'child_process';

export async function POST(req) {
    const secret = req.headers.get('x-reset-secret');
    if (secret !== process.env.RESET_SECRET) {
        return Response.json({ error: 'unauthorized' }, { status: 401 });
    }
    exec('node scripts/seed.js');
    return Response.json({ reset: true });
}

// vercel.json — runs the reset hourly, keeping shared tester data clean
// {
//   "crons": [
//     { "path": "/api/admin/reset", "schedule": "0 * * * *" }
//   ]
// }