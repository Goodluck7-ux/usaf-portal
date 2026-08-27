const ICONS = {
    'Login Success': '✅',
    'Login Failed': '⚠️',
    'Access Code Accepted': '🔑',
    'Document Viewed': '📄',
    'Dashboard Access': '📊',
};

export default function ActivityFeedItem({ log }) {
    return (
        <li className="flex items-start gap-3 py-2.5 text-sm">
            <span>{ICONS[log.action] || '•'}</span>
            <div className="flex-1">
                <p className="text-[#E8ECF4]">{log.action}</p>
                <p className="text-[#7A8BA8] text-xs">
                    {new Date(log.timestamp).toLocaleString()} · {log.location}
                </p>
            </div>
        </li>
    );
}