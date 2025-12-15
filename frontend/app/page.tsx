'use client';

import { useProductSearch } from '@/hooks/useProductSearch';
import { SearchBar } from '@/components/SearchBar';
import { ProductCard } from '@/components/ProductCard';

export default function HomePage() {
  const { products, loading, error, hasSearched, search } = useProductSearch();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        
        <section className="mb-12 flex flex-col items-center text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-gray-900">
            Za-<span className="text-indigo-600">Duck</span> Store 🦆
          </h1>
          <p className="mb-8 text-gray-500">
            Encuentra descuentos ocultos en las palabras.
          </p>
          
          <SearchBar onSearch={search} isLoading={loading} />
        </section>

        <section>
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-600 border border-red-200">
              {error}
            </div>
          )}

          {!loading && !error && hasSearched && products.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No encontramos resultados para tu búsqueda.
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}