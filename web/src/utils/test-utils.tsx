import React, { type PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import type { Store } from "@reduxjs/toolkit";

import materialsReducer from "../features/inventory/materialsSlice";
import productsReducer from "../features/products/productsSlice";
import productionReducer from "../features/production/productionSlice";
import { type RootState } from "../store/store";

const rootReducer = combineReducers({
    materials: materialsReducer,
    products: productsReducer,
    production: productionReducer,
});

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: Partial<RootState>;
    store?: Store;
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = configureStore({
            reducer: rootReducer,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            preloadedState: preloadedState as any,
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {},
) {
    function Wrapper({
        children,
    }: PropsWithChildren<object>): React.JSX.Element {
        return (
            <Provider store={store}>
                <MemoryRouter>{children}</MemoryRouter>
            </Provider>
        );
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
