import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Dashboard } from "../features/dashboard/Dashboard";
import { InventoryList } from "../features/inventory/InventoryList";
import { ProductsList } from "../features/products/ProductsList";
import { ProductForm } from "../features/products/ProductForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/inventory",
                element: <InventoryList />,
            },
            {
                path: "/products",
                element: <ProductsList />,
            },
            {
                path: "/products/new",
                element: <ProductForm />,
            },
        ],
    },
]);
