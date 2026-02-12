import materialsReducer, {
    deleteMaterial,
    fetchMaterials,
} from "./materialsSlice";
import { describe, it, expect } from "vitest";

describe("materialsSlice Reducer", () => {
    const initialState = {
        items: [
            { id: 1, name: "Polypropylene Pellets", stockQuantity: 100 },
            { id: 2, name: "Red Masterbatch", stockQuantity: 50 },
        ],
        status: "succeeded" as const,
    };

    it("should handle deleteMaterial.fulfilled", () => {
        const action = {
            type: deleteMaterial.fulfilled.type,
            payload: 1,
        };

        const nextState = materialsReducer(initialState, action);

        expect(nextState.items).toHaveLength(1);
        expect(nextState.items[0].name).toBe("Red Masterbatch");
    });

    it("should handle fetchMaterials.pending", () => {
        const action = { type: fetchMaterials.pending.type };
        const nextState = materialsReducer(initialState, action);
        expect(nextState.status).toBe("loading");
    });
});
