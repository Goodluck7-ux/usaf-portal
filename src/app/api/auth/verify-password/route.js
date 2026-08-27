import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import AccessLog from '@/models/AccessLog';

export async function POST(req) {
    await dbConnect();
    const { portfolioId, password } = await req.json();

    const portfolio = await Portfolio.findOne({ portfolioId });

    if (!portfolio || portfolio.password !== password) {
        await AccessLog.create({
            portfolioId: portfolioId || 'unknown',
            action: 'Login Failed',
            location: 'Web',
        });
        return Response.json({ error: 'Invalid password' }, { status: 401 });
    }

    await AccessLog.create({
        portfolioId,
        action: 'Login Success',
        location: 'Web',
    });

    return Response.json({ verified: true });
}