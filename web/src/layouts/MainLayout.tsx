import { Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Package, Layers } from "lucide-react";

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-bg-body flex">
            {/* Sidebar */}
            <aside className="w-64 bg-bg-card border-r border-border fixed h-full">
                <div className="p-6 border-b border-border">
                    <h1 className="text-2xl font-bold text-primary">
                        Autoflex
                    </h1>
                </div>

                <nav className="p-4 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-text-main hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                        to="/products"
                        className="flex items-center gap-3 px-4 py-3 text-text-main hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <Package size={20} />
                        <span className="font-medium">Products</span>
                    </Link>
                    <Link
                        to="/materials"
                        className="flex items-center gap-3 px-4 py-3 text-text-main hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <Layers size={20} />
                        <span className="font-medium">Inventory</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
};
