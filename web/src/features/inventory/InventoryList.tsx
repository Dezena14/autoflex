import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Package, Plus, Search, RefreshCw, Trash2, Edit } from "lucide-react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import {
    fetchMaterials,
    updateMaterialStock,
    createMaterial,
    deleteMaterial,
} from "./materialsSlice";
import { type RootState, type AppDispatch } from "../../store/store";
import { type RawMaterial } from "../../services/api";

export const InventoryList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status } = useSelector(
        (state: RootState) => state.materials,
    );
    const loading = status === "loading";
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState<{
        id: number;
        name: string;
        stockQuantity: number;
    } | null>(null);
    const [newMaterialName, setNewMaterialName] = useState("");
    const [newMaterialStock, setNewMaterialStock] = useState("");

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchMaterials());
        }
    }, [status, dispatch]);

    const handleRefresh = () => {
        dispatch(fetchMaterials());
    };

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this material?")) {
            await dispatch(deleteMaterial(id));
        }
    };

    const handleOpenCreate = () => {
        setNewMaterialName("");
        setNewMaterialStock("");
        setIsCreateOpen(true);
    };

    const handleCreateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await dispatch(
            createMaterial({
                name: newMaterialName,
                stockQuantity: Number(newMaterialStock),
            }),
        );
        setIsCreateOpen(false);
    };

    const handleOpenEdit = (material: RawMaterial) => {
        setSelectedMaterial(material);
        setNewMaterialStock(String(material.stockQuantity));
        setIsEditOpen(true);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedMaterial) return;

        await dispatch(
            updateMaterialStock({
                id: selectedMaterial.id,
                quantity: Number(newMaterialStock),
            }),
        );
        setIsEditOpen(false);
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
                    <Button
                        className="flex items-center gap-2"
                        onClick={handleOpenCreate}
                    >
                        <Plus size={16} />
                        Add Material
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
                            placeholder="Search materials..."
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                <th className="px-6 py-4 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredItems.map((material) => (
                                <tr
                                    key={material.id}
                                    className="hover:bg-slate-50"
                                >
                                    <td className="px-6 py-4 text-slate-500">
                                        #{material.id}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {material.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`font-bold ${material.stockQuantity < 10 ? "text-red-600" : "text-green-600"}`}
                                        >
                                            {material.stockQuantity} kg
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    handleOpenEdit(material)
                                                }
                                                className="text-xs h-8 px-2 flex items-center gap-1"
                                                title="Update Stock"
                                            >
                                                <Edit size={14} /> Stock
                                            </Button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(material.id)
                                                }
                                                className="text-slate-400 hover:text-red-600 transition-colors p-1"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
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

            <Modal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                title="New Raw Material"
            >
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg"
                            value={newMaterialName}
                            onChange={(e) => setNewMaterialName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Initial Stock (kg)
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={newMaterialStock}
                            onChange={(e) =>
                                setNewMaterialStock(e.target.value)
                            }
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full mt-4">
                        Create Material
                    </Button>
                </form>
            </Modal>

            <Modal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title="Update Stock"
            >
                <form onSubmit={handleEditSubmit} className="space-y-4">
                    <p className="text-sm text-slate-600">
                        Updating stock for:{" "}
                        <strong>{selectedMaterial?.name}</strong>
                    </p>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            New Quantity (kg)
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={newMaterialStock}
                            onChange={(e) =>
                                setNewMaterialStock(e.target.value)
                            }
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full mt-4">
                        Save Changes
                    </Button>
                </form>
            </Modal>

            <Modal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                title="New Raw Material"
            >
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <input
                            className="w-full px-3 py-2 border rounded-lg"
                            value={newMaterialName}
                            onChange={(e) => setNewMaterialName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Initial Stock (kg)
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={newMaterialStock}
                            onChange={(e) =>
                                setNewMaterialStock(e.target.value)
                            }
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full mt-4">
                        Create Material
                    </Button>
                </form>
            </Modal>
            <Modal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title="Update Stock"
            >
                <form onSubmit={handleEditSubmit} className="space-y-4">
                    <p className="text-sm text-slate-600">
                        Updating stock for:{" "}
                        <strong>{selectedMaterial?.name}</strong>
                    </p>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            New Quantity (kg)
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border rounded-lg"
                            value={newMaterialStock}
                            onChange={(e) =>
                                setNewMaterialStock(e.target.value)
                            }
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full mt-4">
                        Save Changes
                    </Button>
                </form>
            </Modal>
        </div>
    );
};
