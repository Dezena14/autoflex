import { configureStore } from "@reduxjs/toolkit";
import productionReducer from "../features/production/productionSlice";
import materialsReducer from "../features/inventory/materialsSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
    reducer: {
        production: productionReducer,
        materials: materialsReducer,
        products: productsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
