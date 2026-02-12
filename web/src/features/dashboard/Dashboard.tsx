import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, TrendingUp, AlertTriangle, RefreshCw } from "lucide-react";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { fetchProductionPlan } from "../production/productionSlice";
import { fetchMaterials } from "../inventory/materialsSlice";
import { type RootState, type AppDispatch } from "../../store/store";

export const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { plan, status } = useSelector(
        (state: RootState) => state.production,
    );

    const { items: materials } = useSelector(
        (state: RootState) => state.materials,
    );

    const loading = status === "loading";

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProductionPlan());
            dispatch(fetchMaterials());
        }
    }, [status, dispatch]);

    const handleRefresh = () => {
        dispatch(fetchProductionPlan());
        dispatch(fetchMaterials());
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
    };

    const totalStock = materials.reduce(
        (acc, item) => acc + item.stockQuantity,
        0,
    );

    const totalQuantity =
        plan?.productionList.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">
                        Dashboard
                    </h1>
                    <p className="text-text-muted">
                        Production overview based on current inventory
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                        <span>{loading ? "Updating..." : "Refresh Data"}</span>
                    </Button>
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
                                Items to Produce
                            </p>
                            <h3 className="text-2xl font-bold text-text-main">
                                {loading && !plan ? "..." : totalQuantity}
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
                                Estimated Value
                            </p>
                            <h3 className="text-2xl font-bold text-text-main">
                                {loading && !plan
                                    ? "..."
                                    : formatCurrency(
                                          plan?.grandTotalValue || 0,
                                      )}
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
                                Total Stock (kg)
                            </p>
                            <h3 className="text-2xl font-bold text-text-main">
                                {materials.length > 0
                                    ? totalStock.toLocaleString()
                                    : "---"}
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>

            <h2 className="text-lg font-bold text-text-main mt-8">
                Suggested Production Plan
            </h2>

            <div className="grid gap-4">
                {plan?.productionList.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-xl border border-border flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                {item.quantity}
                            </div>
                            <div>
                                <h4 className="font-bold text-text-main">
                                    {item.productName}
                                </h4>
                                <p className="text-sm text-text-muted">
                                    Priority #{index + 1} (Highest Profit)
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <span className="block text-xs text-text-muted uppercase font-semibold">
                                    Total Value
                                </span>
                                <span className="font-bold text-green-600">
                                    {formatCurrency(item.totalValue)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {!loading && (!plan || plan.productionList.length === 0) && (
                    <div className="p-12 text-center flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        <Package className="h-12 w-12 text-slate-300 mb-3" />
                        <p className="text-text-muted font-medium">
                            No production possible with current stock.
                        </p>
                        <span className="text-sm text-slate-400">
                            Add more raw materials in the Inventory tab.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};
