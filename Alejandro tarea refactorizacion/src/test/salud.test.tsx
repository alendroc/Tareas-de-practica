import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Saludar } from '../components/Saludar/saludar';
import { productoService } from '../service/productoService';

vi.mock('../service/productoService', () => ({
 productoService: vi.fn()
}));

describe('Componentes de saludar', () => {
    it('render sin fallos', async () => {
      (productoService as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Producto 1', price: 10, image: 'image1.jpg' },
      { id: 2, title: 'Producto 2', price: 20, image: 'image2.jpg' },
    ]);
    render(<Saludar />);
    expect(await screen.findByText('Producto 1')).toBeInTheDocument();
    expect(await screen.findByText('$ 10')).toBeInTheDocument();
    expect(await screen.findByText('Producto 2')).toBeInTheDocument();
    expect(await screen.findByText('$ 20')).toBeInTheDocument();
    });

    it('No deberia mostrar productos', async () => {
        // Mock the response of productoService
        (productoService as jest.Mock).mockResolvedValue([]);
    
        render(<Saludar />);
 
        expect(await screen.queryByText('Producto 1')).not.toBeInTheDocument();
        expect(await screen.queryByText('$ 10')).not.toBeInTheDocument();
      });
})