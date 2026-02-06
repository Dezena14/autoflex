import { Package, TrendingUp, AlertTriangle } from "lucide-react";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";

export const Dashboard = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">
                        Dashboard
                    </h1>
                    <p className="text-text-muted">
                        Overview of your production metrics
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button>New Production</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-text-muted font-medium">
                                Total Products
                            </p>
                            <h3 className="text-2xl font-bold text-text-main">
                                ---
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-text-muted font-medium">
                                Production Value
                            </p>
                            <h3 className="text-2xl font-bold text-text-main">
                                R$ 0,00
                            </h3>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-text-muted font-medium">
                                Low Stock Items
                            </p>
                            <h3 className="text-2xl font-bold text-text-main">
                                ---
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-8 p-8 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-text-muted bg-slate-50">
                <Package className="mb-2 opacity-50" size={48} />
                <p>No recent productions found</p>
                <span className="text-sm">
                    Start a new production plan to see data here.
                </span>
            </div>
        </div>
    );
};
