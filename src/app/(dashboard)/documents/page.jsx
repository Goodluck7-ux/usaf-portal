import { dbConnect } from '@/lib/mongodb';
import Portfolio from '@/models/Portfolio';
import RestrictionStatusCard from '@/components/documents/RestrictionStatusCard';
import DocumentListItem from '@/components/documents/DocumentListItem';

// Fictional demo documents only — no real certificates or scanned files
const documents = [
    { name: 'Restriction Order.pdf', certified: true },
    { name: 'DoD Authorization.pdf', certified: true },
    { name: 'Valuation Report.pdf', certified: true },
    { name: 'Asset Statement.pdf', certified: true },
];

export default async function DocumentsPage() {
    await dbConnect();
    const p = await Portfolio.findOne({});

    return (
        <main className="px-4 pt-8 max-w-lg mx-auto space-y-4">
            <h1 className="text-[#E8ECF4] font-semibold text-lg">Restriction Status</h1>

            <RestrictionStatusCard restriction={p.restriction} status={p.status} />

            <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-5">
                <p className="text-[#7A8BA8] text-xs uppercase tracking-wide mb-3">Official Documents</p>
                <ul className="divide-y divide-[#1E3A5F]">
                    {documents.map((doc) => (
                        <DocumentListItem key={doc.name} {...doc} />
                    ))}
                </ul>
                <button
                    className="w-full mt-4 border border-[#1E3A5F] text-[#E8ECF4] text-sm rounded py-2
                     hover:border-[#D4A73C] transition"
                >
                    View Documents
                </button>
            </div>
        </main>
    );
}