import { generateRegistrationOptions } from '@simplewebauthn/server';
import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';

const rpName = 'USAF Officer Portfolio Portal';
const rpID = process.env.RP_ID; // e.g. 'your-domain.vercel.app', NOT localhost for real testers

export async function POST(req) {
    await dbConnect();
    const { portfolioId } = await req.json();

    const portfolio = await Portfolio.findOne({ portfolioId });
    if (!portfolio) {
        return Response.json({ error: 'Invalid access code' }, { status: 401 });
    }

    const options = await generateRegistrationOptions({
        rpName,
        rpID,
        userID: Buffer.from(portfolio.portfolioId),
        userName: portfolio.officerName,
        attestationType: 'none',
        authenticatorSelection: {
            authenticatorAttachment: 'platform', // forces device biometric, not a USB key
            userVerification: 'required',
        },
    });

    // Stash challenge in a short-lived cookie to verify against next request
    const res = Response.json(options);
    res.headers.set(
        'Set-Cookie',
        `webauthn_challenge=${options.challenge}; HttpOnly; Path=/; Max-Age=300; SameSite=Strict; Secure`
    );
    return res;
}