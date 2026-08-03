import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import Topbar from "@/components/dashboard/Topbar";

import {
    Users,
    Rocket,
    Phone,
} from "lucide-react";

export default function DashboardPage() {
    return (
        <main className="flex h-screen bg-slate-950">

            <Sidebar />

            <section className="flex flex-1 flex-col">

                <Topbar />

                <div className="grid grid-cols-3 gap-6 p-8">

                    <StatCard
                        title="Total Customers"
                        value="14,782"
                        trend="+3.2%"
                        positive
                        icon={<Users className="text-cyan-400" />}
                    />

                    <StatCard
                        title="Active Leads"
                        value="3,105"
                        trend="+5.8%"
                        positive
                        icon={<Rocket className="text-orange-400" />}
                    />

                    <StatCard
                        title="Contacted This Week"
                        value="947"
                        trend="-1.5%"
                        icon={<Phone className="text-pink-400" />}
                    />

                </div>

            </section>

        </main>
    );
}