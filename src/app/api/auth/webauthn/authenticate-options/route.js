import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { dbConnect } from '@/lib/mongodb';
import Credential from '@/models/Credential';

const rpID = process.env.RP_ID;

export async function POST(req) {
    await dbConnect();
    const { portfolioId } = await req.json();

    const creds = await Credential.find({ portfolioId });
    if (creds.length === 0) {
        // No enrolled credential yet — tells the client to fall back to registration
        return Response.json({ error: 'not_enrolled' }, { status: 404 });
    }

    const options = await generateAuthenticationOptions({
        rpID,
        userVerification: 'required',
        allowCredentials: creds.map((c) => ({
            id: c.credentialID,
            type: 'public-key',
            transports: c.transports,
        })),
    });

    const res = Response.json(options);
    res.headers.set(
        'Set-Cookie',
        `webauthn_challenge=${options.challenge}; HttpOnly; Path=/; Max-Age=300; SameSite=Strict; Secure`
    );
    return res;
}