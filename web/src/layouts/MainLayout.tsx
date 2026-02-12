import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { Sidebar } from "../components/Sidebar";

export const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">
                <header className="md:hidden bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-30">
                    <span className="font-bold text-lg text-blue-600">
                        Autoflex
                    </span>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                        <Menu size={24} />
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
