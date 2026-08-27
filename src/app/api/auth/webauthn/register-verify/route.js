import { verifyRegistrationResponse } from '@simplewebauthn/server';
import { dbConnect } from '@/lib/mongodb';
import Credential from '@/models/Credential';

const rpID = process.env.RP_ID;
const origin = process.env.ORIGIN; // e.g. 'https://your-domain.vercel.app'

export async function POST(req) {
    await dbConnect();
    const { portfolioId, response } = await req.json();
    const expectedChallenge = req.cookies.get('webauthn_challenge')?.value;

    const verification = await verifyRegistrationResponse({
        response,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
    });

    if (!verification.verified) {
        return Response.json({ verified: false }, { status: 400 });
    }

    const { credentialID, credentialPublicKey, counter } = verification.registrationInfo;

    await Credential.create({
        portfolioId,
        credentialID: Buffer.from(credentialID).toString('base64url'),
        publicKey: Buffer.from(credentialPublicKey).toString('base64url'),
        counter,
    });

    return Response.json({ verified: true });
}