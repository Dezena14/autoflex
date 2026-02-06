import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Dashboard } from "../features/dashboard/Dashboard";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />

                    <Route
                        path="/products"
                        element={<div>Products Page</div>}
                    />
                    <Route
                        path="/materials"
                        element={<div>Inventory Page</div>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
