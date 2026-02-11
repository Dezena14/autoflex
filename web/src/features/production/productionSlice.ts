import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, type ProductionPlan } from "../../services/api";

interface ProductionState {
    plan: ProductionPlan | null;
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ProductionState = {
    plan: null,
    status: "idle",
};

export const fetchProductionPlan = createAsyncThunk(
    "production/fetchPlan",
    async () => {
        const response = await api.getPlan();
        return response;
    },
);

const productionSlice = createSlice({
    name: "production",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductionPlan.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProductionPlan.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.plan = action.payload;
            })
            .addCase(fetchProductionPlan.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default productionSlice.reducer;
