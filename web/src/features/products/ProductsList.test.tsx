import { screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductsList } from './ProductsList';
import { renderWithProviders } from '../../utils/test-utils';

const mockProducts = [
    { id: 1, name: 'Plastic Chair', price: 100, composition: [] },
    { id: 2, name: 'Plastic Stool', price: 200, composition: [] },
];

describe('ProductsList Integration', () => {
    it('should render products from store', () => {
        renderWithProviders(<ProductsList />, {
            preloadedState: {
                products: { items: mockProducts, status: 'succeeded' }
            }
        });

        expect(screen.getByText('Plastic Chair')).toBeInTheDocument();
        expect(screen.getByText('Plastic Stool')).toBeInTheDocument();
    });

    it('should filter products when searching', async () => {
        renderWithProviders(<ProductsList />, {
            preloadedState: {
                products: { items: mockProducts, status: 'succeeded' }
            }
        });

        const searchInput = screen.getByPlaceholderText(/Search products/i);
        
        fireEvent.change(searchInput, { target: { value: 'Chair' } });

        expect(screen.getByText('Plastic Chair')).toBeInTheDocument();
        expect(screen.queryByText('Plastic Stool')).not.toBeInTheDocument();
    });

    it('should open delete confirmation when clicking trash icon', async () => {
        const confirmSpy = vi.spyOn(window, 'confirm').mockImplementation(() => true);
        
        renderWithProviders(<ProductsList />, {
            preloadedState: {
                products: { items: mockProducts, status: 'succeeded' }
            }
        });

        const deleteButtons = screen.getAllByTitle('Delete Product');
        
        fireEvent.click(deleteButtons[0]);

        expect(confirmSpy).toHaveBeenCalled();
        
        confirmSpy.mockRestore();
    });

    it('should open recipe modal when clicking View Recipe', () => {
        renderWithProviders(<ProductsList />, {
            preloadedState: {
                products: { items: mockProducts, status: 'succeeded' }
            }
        });

        const viewButtons = screen.getAllByText(/View Recipe/i);
        fireEvent.click(viewButtons[0]);

        expect(screen.getByText(/Recipe: Plastic Chair/i)).toBeInTheDocument();
    });
});