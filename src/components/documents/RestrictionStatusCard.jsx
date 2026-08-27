export default function RestrictionStatusCard({ restriction, status }) {
    const rows = [
        ['Restriction Authority', restriction.authority],
        ['Effective Date', restriction.effectiveDate?.toLocaleDateString()],
        ['Review Date', restriction.reviewDate?.toLocaleDateString()],
        ['Restriction Reason', restriction.reason],
    ];

    return (
        <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
                <p className="text-[#7A8BA8] text-xs uppercase tracking-wide">Restriction Status</p>
                <span className="text-[#DC2626] text-xs font-semibold bg-[#DC2626]/10 border border-[#DC2626]/40 px-2 py-0.5 rounded">
                    {status.toUpperCase()}
                </span>
            </div>

            <dl className="space-y-2 text-sm mb-4">
                {rows.map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                        <dt className="text-[#7A8BA8]">{label}</dt>
                        <dd className="text-[#E8ECF4]">{value}</dd>
                    </div>
                ))}
            </dl>

            <p className="text-[#7A8BA8] text-xs uppercase tracking-wide mb-2">Locked Actions</p>
            <ul className="grid grid-cols-2 gap-2">
                {restriction.lockedActions.map((action) => (
                    <li
                        key={action}
                        className="flex items-center justify-between bg-[#0A1628] border border-[#1E3A5F]
                       rounded px-3 py-2 text-xs text-[#E8ECF4]"
                    >
                        {action}
                        <span className="text-[#DC2626]">🔒</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}