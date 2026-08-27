'use client';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#4ADE80', '#60A5FA', '#D4A73C', '#F472B6', '#7A8BA8'];

export default function AllocationDonut({ allocation, total }) {
    const data = Object.values(allocation).map((value) => ({ value }));

    return (
        <div className="relative h-48">
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} dataKey="value" innerRadius={55} outerRadius={80} paddingAngle={2}>
                        {data.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[#7A8BA8] text-[10px]">Total</p>
                <p className="text-[#E8ECF4] font-mono font-semibold text-sm">
                    ${total.toLocaleString()}
                </p>
            </div>
        </div>
    );
}