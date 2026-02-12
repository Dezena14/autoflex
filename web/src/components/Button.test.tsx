import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
    it('should render correct text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should call onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Action</Button>);
        fireEvent.click(screen.getByText('Action'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});