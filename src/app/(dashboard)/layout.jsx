import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import DashboardNav from '@/components/dashboard/DashboardNav';
import TopBar from '@/components/dashboard/TopBar';

export default async function DashboardLayout({ children }) {
    await dbConnect();
    const p = await Portfolio.findOne({});

    return (
        <div className="min-h-screen bg-[#0A1628] pb-20">
            <TopBar officerName={p.officerName} rank={p.rank} />
            {children}
            <DashboardNav />
        </div>
    );
}