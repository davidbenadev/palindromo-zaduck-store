import { Product } from '@/domains/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const productService = {
  async search(term: string): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products/search?q=${term}`);
    
    if (!response.ok) {
      if (response.status === 400) throw new Error('El término de búsqueda es inválido.');
      throw new Error('Error de conexión con el servidor.');
    }

    return response.json();
  }
};