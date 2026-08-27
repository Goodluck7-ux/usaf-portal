export default function PortfolioStatusBadge({ status }) {
    const isFrozen = status === 'frozen';
    return (
        <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded
                  ${isFrozen ? 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/40'
                    : 'bg-[#D4A73C]/10 text-[#D4A73C] border border-[#D4A73C]/40'}`}
        >
            Portfolio Status: {status.toUpperCase()}
        </span>
    );
}