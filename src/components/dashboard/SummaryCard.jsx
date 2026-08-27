export default function SummaryCard({ label, value }) {
    return (
        <div className="bg-[#0F1F3D] border border-[#1E3A5F] rounded-lg p-4">
            <p className="text-[#7A8BA8] text-xs uppercase tracking-wide">{label}</p>
            <p className="text-[#E8ECF4] font-mono font-semibold mt-1">
                ${value.toLocaleString()}
            </p>
        </div>
    );
}