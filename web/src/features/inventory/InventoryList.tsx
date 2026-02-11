import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, Plus, Search, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "../../components/Button";
import { fetchMaterials } from "./materialsSlice";
import { type RootState, type AppDispatch } from "../../store/store";

export const InventoryList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status } = useSelector(
        (state: RootState) => state.materials,
    );

    const loading = status === "loading";

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMaterials());
        }
    }, [status, dispatch]);

    const handleRefresh = () => {
        dispatch(fetchMaterials());
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">
                        Inventory Management
                    </h1>
                    <p className="text-text-muted">
                        Manage raw materials and stock levels
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={handleRefresh}
                        disabled={loading}
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                    </Button>
                    <Button className="flex items-center gap-2">
                        <Plus size={16} />
                        Add Material
                    </Button>
                </div>
            </div>

            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-slate-50 flex gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search materials..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-text-muted font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Material Name</th>
                                <th className="px-6 py-4">Stock Quantity</th>
                                <th className="px-6 py-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading && items.length === 0
                                ?
                                  [...Array(3)].map((_, i) => (
                                      <tr key={i} className="animate-pulse">
                                          <td className="px-6 py-4">
                                              <div className="h-4 bg-slate-200 rounded w-8"></div>
                                          </td>
                                          <td className="px-6 py-4">
                                              <div className="h-4 bg-slate-200 rounded w-32"></div>
                                          </td>
                                          <td className="px-6 py-4">
                                              <div className="h-4 bg-slate-200 rounded w-16"></div>
                                          </td>
                                          <td className="px-6 py-4"></td>
                                      </tr>
                                  ))
                                : items.map((material) => (
                                      <tr
                                          key={material.id}
                                          className="hover:bg-slate-50 transition-colors"
                                      >
                                          <td className="px-6 py-4 text-slate-500">
                                              #{material.id}
                                          </td>
                                          <td className="px-6 py-4 font-medium text-text-main">
                                              {material.name}
                                          </td>
                                          <td className="px-6 py-4">
                                              <div className="flex items-center gap-2">
                                                  <span
                                                      className={`font-bold ${material.stockQuantity < 10 ? "text-red-600" : "text-text-main"}`}
                                                  >
                                                      {material.stockQuantity}{" "}
                                                      kg
                                                  </span>
                                              </div>
                                          </td>
                                          <td className="px-6 py-4 text-right">
                                              {material.stockQuantity < 10 ? (
                                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                      <AlertCircle size={12} />{" "}
                                                      Low Stock
                                                  </span>
                                              ) : (
                                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                      In Stock
                                                  </span>
                                              )}
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>

                {!loading && items.length === 0 && (
                    <div className="p-12 text-center text-text-muted">
                        <Package className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <p>No materials found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
