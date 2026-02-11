import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Save, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "../../components/Button";
import { addProduct } from "./productsSlice";
import { fetchMaterials } from "../inventory/materialsSlice";
import { type RootState, type AppDispatch } from "../../store/store";

interface CompositionItem {
    materialId: number;
    materialName: string;
    quantity: number;
}

export const ProductForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { items: materials } = useSelector(
        (state: RootState) => state.materials,
    );

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [composition, setComposition] = useState<CompositionItem[]>([]);

    const [selectedMaterialId, setSelectedMaterialId] = useState<number | "">(
        "",
    );
    const [quantityInput, setQuantityInput] = useState("");

    useEffect(() => {
        if (materials.length === 0) {
            dispatch(fetchMaterials());
        }
    }, [dispatch, materials.length]);

    const handleAddMaterial = () => {
        if (!selectedMaterialId || !quantityInput) return;

        const material = materials.find(
            (m) => m.id === Number(selectedMaterialId),
        );
        if (!material) return;

        const newItem: CompositionItem = {
            materialId: material.id,
            materialName: material.name,
            quantity: Number(quantityInput),
        };

        setComposition([...composition, newItem]);
        setQuantityInput("");
    };

    const handleRemoveMaterial = (index: number) => {
        setComposition(composition.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name,
            price: Number(price),
            composition: composition.map((item) => ({
                rawMaterial: { id: item.materialId },
                quantityNeeded: item.quantity,
            })),
        };

        await dispatch(addProduct(payload));
        navigate("/products");
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => navigate("/products")}>
                    <ArrowLeft size={16} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-text-main">
                        New Product
                    </h1>
                    <p className="text-text-muted">
                        Define the product and its recipe
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white border border-border rounded-xl p-6 shadow-sm space-y-6"
            >
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-main">
                            Product Name
                        </label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Plastic Chair"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-main">
                            Selling Price ($)
                        </label>
                        <input
                            required
                            type="number"
                            step="0.01"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-4">
                    <h3 className="font-medium text-text-main">
                        Production Recipe (Composition)
                    </h3>

                    <div className="flex gap-4 items-end bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <div className="flex-1 space-y-2">
                            <label className="text-xs font-bold text-text-muted uppercase">
                                Raw Material
                            </label>
                            <select
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-white"
                                value={selectedMaterialId}
                                onChange={(e) =>
                                    setSelectedMaterialId(
                                        Number(e.target.value),
                                    )
                                }
                            >
                                <option value="">Select a material...</option>
                                {materials.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.name} (Stock: {m.stockQuantity}kg)
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-32 space-y-2">
                            <label className="text-xs font-bold text-text-muted uppercase">
                                Qty (kg)
                            </label>
                            <input
                                type="number"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                value={quantityInput}
                                onChange={(e) =>
                                    setQuantityInput(e.target.value)
                                }
                                placeholder="0"
                            />
                        </div>
                        <Button
                            type="button"
                            onClick={handleAddMaterial}
                            disabled={!selectedMaterialId || !quantityInput}
                        >
                            <Plus size={18} /> Add
                        </Button>
                    </div>

                    <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-text-muted font-medium">
                                <tr>
                                    <th className="px-4 py-2">Material</th>
                                    <th className="px-4 py-2">
                                        Quantity Required
                                    </th>
                                    <th className="px-4 py-2 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {composition.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="px-4 py-8 text-center text-slate-400"
                                        >
                                            No materials added to recipe yet.
                                        </td>
                                    </tr>
                                ) : (
                                    composition.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-3">
                                                {item.materialName}
                                            </td>
                                            <td className="px-4 py-3 font-medium">
                                                {item.quantity} kg
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveMaterial(
                                                            idx,
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-700 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button
                        type="submit"
                        disabled={composition.length === 0 || !name || !price}
                    >
                        <Save size={18} className="mr-2" />
                        Create Product
                    </Button>
                </div>
            </form>
        </div>
    );
};
