import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import AccessLog from '@/models/AccessLog';

export async function POST(req) {
    await dbConnect();
    const { accessCode } = await req.json();

    const portfolio = await Portfolio.findOne({ accessCode });
    if (!portfolio) {
        return Response.json({ error: 'Invalid code' }, { status: 401 });
    }

    await AccessLog.create({
        portfolioId: portfolio.portfolioId,
        action: 'Access Code Accepted',
        location: 'Web',
    });

    return Response.json({ portfolioId: portfolio.portfolioId });
}