"use client";

import {
    LayoutDashboard,
    Users,
    BadgeDollarSign,
    CheckSquare,
    Settings,
} from "lucide-react";

const menus = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Contacts",
        icon: Users,
    },
    {
        title: "Deals",
        icon: BadgeDollarSign,
    },
    {
        title: "Tasks",
        icon: CheckSquare,
    },
    {
        title: "Settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-950 text-white">
            <div className="flex h-16 items-center border-b border-slate-800 px-6">
                <img
                    src="https://i.pravatar.cc/50"
                    className="mr-3 h-10 w-10 rounded-full"
                />

                <div>
                    <h2 className="font-semibold">Alex R.</h2>
                </div>
            </div>

            <nav className="space-y-2 p-4">
                {menus.map((menu) => {
                    const Icon = menu.icon;

                    return (
                        <button
                            key={menu.title}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
                        >
                            <Icon size={18} />
                            {menu.title}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}