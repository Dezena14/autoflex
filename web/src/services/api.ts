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

    getProducts: async (): Promise<Product[]> => {
        const response = await fetch(`${API_URL}/products`);
        return response.json();
    },

    getMaterials: async (): Promise<RawMaterial[]> => {
        const response = await fetch(`${API_URL}/raw-materials`);
        return response.json();
    },

    updateStock: async (id: number, quantity: number) => {
        console.log(`Update stock ${id} to ${quantity}`);
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
};
