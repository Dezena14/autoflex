const API_URL = "http://localhost:8080/api";

export interface ProductionItem {
    productName: string;
    quantity: number;
    totalValue: number;
}

export interface ProductionPlan {
    productionList: ProductionItem[];
    grandTotalValue: number;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    composition?: {
        id: number;
        quantityNeeded: number;
        rawMaterial: {
            id: number;
            name: string;
            stockQuantity: number;
        };
    }[];
}

export interface RawMaterial {
    id: number;
    name: string;
    stockQuantity: number;
}

export interface CreateProductDTO {
    name: string;
    price: number;
    composition: {
        rawMaterial: { id: number };
        quantityNeeded: number;
    }[];
}

export const api = {
    getPlan: async (): Promise<ProductionPlan> => {
        const response = await fetch(`${API_URL}/production-plan`);
        return response.json();
    },

    updateStock: async (id: number, quantity: number): Promise<RawMaterial> => {
        const response = await fetch(`${API_URL}/raw-materials/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ stockQuantity: quantity }),
        });
        return response.json();
    },

    getProducts: async (): Promise<Product[]> => {
        const response = await fetch(`${API_URL}/products`);
        return response.json();
    },

    createProduct: async (productData: CreateProductDTO): Promise<Product> => {
        const response = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        });
        return response.json();
    },

    deleteProduct: async (id: number): Promise<void> => {
        await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
        });
    },

    getMaterials: async (): Promise<RawMaterial[]> => {
        const response = await fetch(`${API_URL}/raw-materials`);
        return response.json();
    },

    createMaterial: async (data: {
        name: string;
        stockQuantity: number;
    }): Promise<RawMaterial> => {
        const response = await fetch(`${API_URL}/raw-materials`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    deleteMaterial: async (id: number): Promise<void> => {
        await fetch(`${API_URL}/raw-materials/${id}`, {
            method: "DELETE",
        });
    },
};
