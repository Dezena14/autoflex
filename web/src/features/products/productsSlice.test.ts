import productsReducer, {
    fetchProducts,
    createProduct,
    deleteProduct,
} from "./productsSlice";
import { describe, it, expect } from "vitest";

describe("productsSlice", () => {
    const initialState = {
        items: [],
        status: "idle" as const,
    };

    const mockProduct = {
        id: 1,
        name: "Garden Chair",
        price: 150.0,
        composition: [],
    };

    it("should set loading when fetching products", () => {
        const action = { type: fetchProducts.pending.type };
        const state = productsReducer(initialState, action);
        expect(state.status).toBe("loading");
    });

    it("should store products when fetch succeeds", () => {
        const action = {
            type: fetchProducts.fulfilled.type,
            payload: [mockProduct],
        };
        const state = productsReducer(initialState, action);
        expect(state.status).toBe("succeeded");
        expect(state.items).toHaveLength(1);
        expect(state.items[0].name).toBe("Garden Chair");
    });

    it("should add new product to the list", () => {
        const action = {
            type: createProduct.fulfilled.type,
            payload: mockProduct,
        };
        const state = productsReducer({ ...initialState, items: [] }, action);
        expect(state.items).toHaveLength(1);
    });

    it("should remove product from the list", () => {
        const existingState = {
            ...initialState,
            items: [mockProduct, { ...mockProduct, id: 2, name: "Table" }],
        };

        const action = {
            type: deleteProduct.fulfilled.type,
            payload: 1,
        };

        const state = productsReducer(existingState, action);
        expect(state.items).toHaveLength(1);
        expect(state.items[0].name).toBe("Table");
    });
});
