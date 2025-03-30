import {productoService} from '../productoService';
import { describe, it, expect, vi } from 'vitest';

describe('productoService', () => {
  it('consulta exitosa', async () => {
    const mockProducts = [
      { price: 10, id: 1, title: 'Product 1', image: 'image1.jpg' },
      { price: 20, id: 2, title: 'Product 2', image: 'image2.jpg' },
    ];

    global.fetch = vi.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
    })
    ) as unknown as jest.Mock;

    const products = await productoService();
    expect(products).toEqual(mockProducts);
  });

  it('debe de dar error la consulta', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
        ok: false,
    })
    ) as unknown as jest.Mock;

    const products = await productoService();
    expect(products).toEqual([]);
  });

  it('network error', async () => {
    global.fetch = vi.fn(() => Promise.reject('Network error')) as unknown as jest.Mock;
    const products = await productoService();
    expect(products).toEqual([]);
  });
});