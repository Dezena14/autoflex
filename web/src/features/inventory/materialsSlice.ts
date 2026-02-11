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

const materialsSlice = createSlice({
    name: "materials",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.pending, (state) => {
                state.status = "loading";
            })
            .addCase(
                fetchMaterials.fulfilled,
                (state, action: PayloadAction<RawMaterial[]>) => {
                    state.status = "succeeded";
                    state.items = action.payload;
                },
            )
            .addCase(fetchMaterials.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default materialsSlice.reducer;
