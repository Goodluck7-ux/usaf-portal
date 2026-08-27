'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// Fictional demo data — no relation to any real account
const data = [
    { month: 'Jan', value: -3 },
    { month: 'Feb', value: 1 },
    { month: 'Mar', value: 4 },
    { month: 'Apr', value: 7 },
    { month: 'May', value: 6.42 },
];

export default function PerformanceChart() {
    return (
        <div className="h-40">
            <ResponsiveContainer>
                <LineChart data={data}>
                    <XAxis dataKey="month" stroke="#7A8BA8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#7A8BA8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip
                        contentStyle={{ background: '#0F1F3D', border: '1px solid #1E3A5F', borderRadius: 6 }}
                        labelStyle={{ color: '#E8ECF4' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#D4A73C" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}