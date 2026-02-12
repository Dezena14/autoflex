import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProductForm } from "./ProductForm";
import { renderWithProviders } from "../../utils/test-utils";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockedNavigate,
    };
});

vi.mock("../../services/api", () => ({
    api: {
        createProduct: vi.fn((data) => Promise.resolve({ id: 123, ...data })),
        getMaterials: vi.fn(() =>
            Promise.resolve([
                { id: 1, name: "Plastic Stool", stockQuantity: 100 },
            ]),
        ),
    },
}));

describe("ProductForm Integration", () => {
    it("should render form inputs", async () => {
        renderWithProviders(<ProductForm />);

        await waitFor(() => {
            expect(screen.getByText(/New Product/i)).toBeInTheDocument();
        });

        expect(
            screen.getByPlaceholderText(/Plastic Chair/i),
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("0.00")).toBeInTheDocument();
    });

    it("should update inputs values when user types", async () => {
        renderWithProviders(<ProductForm />);

        await waitFor(() => screen.getByPlaceholderText(/Plastic Chair/i));

        const nameInput = screen.getByPlaceholderText(
            /Plastic Chair/i,
        ) as HTMLInputElement;
        const priceInput = screen.getByPlaceholderText(
            "0.00",
        ) as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: "Plastic Chair" } });
        fireEvent.change(priceInput, { target: { value: "200" } });

        expect(nameInput.value).toBe("Plastic Chair");
        expect(priceInput.value).toBe("200");
    });

    it("should add a composition row when clicking Add", async () => {
        renderWithProviders(<ProductForm />);

        await waitFor(() => screen.getByRole("button", { name: /add/i }));

        const addButton = screen.getByRole("button", { name: /add/i });
        fireEvent.click(addButton);

        expect(screen.getAllByRole("combobox").length).toBeGreaterThan(0);
    });
});
