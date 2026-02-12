import {
    createSlice,
    createAsyncThunk,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { api, type RawMaterial } from "../../services/api";

interface MaterialsState {
    items: RawMaterial[];
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: MaterialsState = {
    items: [],
    status: "idle",
};

export const fetchMaterials = createAsyncThunk(
    "materials/fetchMaterials",
    async () => {
        const response = await api.getMaterials();
        return response;
    },
);

export const updateMaterialStock = createAsyncThunk(
    "materials/updateStock",
    async ({ id, quantity }: { id: number; quantity: number }) => {
        const response = await api.updateStock(id, quantity);
        return response;
    },
);

export const createMaterial = createAsyncThunk(
    "materials/createMaterial",
    async (data: { name: string; stockQuantity: number }) => {
        const response = await api.createMaterial(data);
        return response;
    },
);

export const deleteMaterial = createAsyncThunk(
    "materials/deleteMaterial",
    async (id: number) => {
        await api.deleteMaterial(id);
        return id;
    },
);

const materialsSlice = createSlice({
    name: "materials",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMaterials.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchMaterials.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(
                updateMaterialStock.fulfilled,
                (state, action: PayloadAction<RawMaterial>) => {
                    const index = state.items.findIndex(
                        (item) => item.id === action.payload.id,
                    );
                    if (index !== -1) {
                        state.items[index] = action.payload;
                    }
                },
            )
            .addCase(
                createMaterial.fulfilled,
                (state, action: PayloadAction<RawMaterial>) => {
                    state.items.push(action.payload);
                },
            )
            .addCase(deleteMaterial.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload,
                );
            });
    },
});

export default materialsSlice.reducer;
