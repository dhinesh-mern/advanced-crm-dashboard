"use client";

import { Bell, Search } from "lucide-react";

export default function Topbar() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">

            <div className="relative w-96">

                <Search
                    className="absolute left-4 top-3 text-gray-400"
                    size={18}
                />

                <input
                    placeholder="Search CRM..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2 pl-10 text-white outline-none"
                />
            </div>

            <div className="flex items-center gap-6">

                <Bell className="text-white" />

                <img
                    src="https://i.pravatar.cc/100"
                    className="h-10 w-10 rounded-full"
                />

            </div>

        </header>
    );
}