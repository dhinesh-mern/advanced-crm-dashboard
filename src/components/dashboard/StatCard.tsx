"use client";

import { ReactNode } from "react";

interface Props {
    title: string;
    value: string;
    trend: string;
    positive?: boolean;
    icon: ReactNode;
}

export default function StatCard({
    title,
    value,
    trend,
    positive,
    icon,
}: Props) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow">

            <div className="mb-5 flex items-center gap-3">

                <div className="rounded-lg bg-slate-800 p-3">
                    {icon}
                </div>

                <h3 className="text-3xl font-bold text-white">
                    {value}
                </h3>

            </div>

            <p className="text-sm text-gray-400">{title}</p>

            <p
                className={`mt-3 text-sm ${
                    positive ? "text-green-400" : "text-red-400"
                }`}
            >
                Trend {trend}
            </p>

        </div>
    );
}