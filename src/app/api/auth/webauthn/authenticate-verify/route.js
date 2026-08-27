import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import { dbConnect } from '@/lib/mongodb';
import Credential from '@/models/Credential';
import AccessLog from '@/models/AccessLog';

const rpID = process.env.RP_ID;
const origin = process.env.ORIGIN;

export async function POST(req) {
    await dbConnect();
    const { portfolioId, response } = await req.json();
    const expectedChallenge = req.cookies.get('webauthn_challenge')?.value;

    const credential = await Credential.findOne({
        credentialID: response.id,
        portfolioId,
    });
    if (!credential) {
        return Response.json({ error: 'unknown_credential' }, { status: 400 });
    }

    const verification = await verifyAuthenticationResponse({
        response,
        expectedChallenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        authenticator: {
            credentialID: Buffer.from(credential.credentialID, 'base64url'),
            credentialPublicKey: Buffer.from(credential.publicKey, 'base64url'),
            counter: credential.counter,
        },
    });

    if (!verification.verified) {
        await AccessLog.create({ portfolioId, action: 'Login Failed', location: 'Web' });
        return Response.json({ verified: false }, { status: 401 });
    }

    credential.counter = verification.authenticationInfo.newCounter;
    await credential.save();

    await AccessLog.create({ portfolioId, action: 'Login Success', location: 'Web' });
    return Response.json({ verified: true });
}