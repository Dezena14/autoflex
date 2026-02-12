import { X, LayoutDashboard, Package, Archive } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/" },
        { icon: Archive, label: "Products", path: "/products" },
        { icon: Package, label: "Inventory", path: "/inventory" },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={onClose}
                />
            )}
            <aside
                className={`
                fixed md:static inset-y-0 left-0 z-50
                w-64 bg-white border-r border-border transform transition-transform duration-200 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 
            `}
            >
                <div className="h-full flex flex-col">
                    <div className="h-16 flex items-center justify-between px-6 border-b border-border">
                        <span className="text-xl font-bold text-primary">
                            Autoflex
                        </span>
                        <button
                            onClick={onClose}
                            className="md:hidden text-slate-400"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => onClose()}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium
                                    ${
                                        isActive(item.path)
                                            ? "bg-blue-50 text-primary"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }
                                `}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="p-4 border-t border-border">
                        <div className="bg-slate-50 p-3 rounded-lg">
                            <p className="text-xs text-slate-500 font-medium">
                                System Status
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-slate-700">
                                    Online
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
