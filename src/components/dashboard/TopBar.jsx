import Logo from '@/components/Logo';

export default function TopBar({ officerName, rank }) {
    return (
        <header className="flex items-center justify-between px-4 pt-4 max-w-lg mx-auto">
            <Logo size="small" />
            <div className="text-center">
                <p className="text-[#E8ECF4] text-xs font-semibold">{officerName}</p>
                <p className="text-[#7A8BA8] text-[10px]">{rank}</p>
            </div>
            <Logo size="small" />
        </header>
    );
}