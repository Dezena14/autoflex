import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, type Product, type CreateProductDTO } from "../../services/api";
import { type PayloadAction } from "@reduxjs/toolkit";

interface ProductsState {
    items: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ProductsState = {
    items: [],
    status: "idle",
};

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const response = await api.getProducts();
        return response;
    },
);

export const addProduct = createAsyncThunk(
    "products/addProduct",
    async (newProduct: CreateProductDTO) => {
        const response = await api.createProduct(newProduct);
        return response;
    },
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (id: number) => {
        await api.deleteProduct(id);
        return id;
    },
);

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(
                addProduct.fulfilled,
                (state, action: PayloadAction<Product>) => {
                    state.items.push(action.payload);
                },
            )
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload,
                );
            });
    },
});

export default productsSlice.reducer;
