import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, Plus, Search, RefreshCw, Layers } from "lucide-react";
import { Button } from "../../components/Button";
import { fetchProducts } from "./productsSlice";
import { type RootState, type AppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

export const ProductsList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { items, status } = useSelector((state: RootState) => state.products);

    const loading = status === "loading";

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const handleRefresh = () => {
        dispatch(fetchProducts());
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-text-main">
                        Products Catalog
                    </h1>
                    <p className="text-text-muted">
                        Manage your manufacturable items
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={loading}
                        className="h-10 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                    >
                        <RefreshCw
                            size={16}
                            className={loading ? "animate-spin" : ""}
                        />
                    </button>
                    <Button
                        className="flex items-center gap-2"
                        onClick={() => navigate("/products/new")}
                    >
                        <Plus size={16} />
                        New Product
                    </Button>
                </div>
            </div>

            <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-border bg-slate-50">
                    <div className="relative max-w-sm">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-text-muted font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">Selling Price</th>
                                <th className="px-6 py-4">Composition</th>
                                <th className="px-6 py-4 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {loading && items.length === 0
                                ? [...Array(3)].map((_, i) => (
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
                                          <td className="px-6 py-4">
                                              <div className="h-4 bg-slate-200 rounded w-24"></div>
                                          </td>
                                          <td className="px-6 py-4"></td>
                                      </tr>
                                  ))
                                : items.map((product) => (
                                      <tr
                                          key={product.id}
                                          className="hover:bg-slate-50 transition-colors"
                                      >
                                          <td className="px-6 py-4 text-slate-500">
                                              #{product.id}
                                          </td>
                                          <td className="px-6 py-4 font-bold text-text-main">
                                              {product.name}
                                          </td>
                                          <td className="px-6 py-4 text-green-600 font-medium">
                                              {formatCurrency(product.price)}
                                          </td>
                                          <td className="px-6 py-4">
                                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                  <Layers size={12} />
                                                  View Recipe
                                              </span>
                                          </td>
                                          <td className="px-6 py-4 text-right text-slate-400">
                                              ...
                                          </td>
                                      </tr>
                                  ))}
                        </tbody>
                    </table>
                </div>

                {!loading && items.length === 0 && (
                    <div className="p-12 text-center text-text-muted">
                        <Package className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <p>No products found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
