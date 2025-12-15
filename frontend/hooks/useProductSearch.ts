import { useState } from 'react';
import { Product } from '@/domains/product';
import { productService } from '@/services/product.service';

export const useProductSearch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const search = async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const data = await productService.search(term);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    hasSearched,
    search,
  };
};