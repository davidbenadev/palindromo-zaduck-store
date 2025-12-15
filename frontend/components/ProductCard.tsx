import { Product } from '@/domains/product';

export const ProductCard = ({ product }: { product: Product }) => {
  const isPromo = !!product.discountPrice;

  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-xl border bg-white transition-all hover:shadow-lg ${isPromo ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-gray-200'}`}>
      
      {isPromo && (
        <span className="absolute right-0 top-0 rounded-bl-lg bg-indigo-600 px-3 py-1 text-xs font-bold text-white z-10">
          50% OFF
        </span>
      )}

      <div className="flex h-48 items-center justify-center bg-gray-100">
        <span className="text-4xl">👟</span> 
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-bold uppercase text-gray-800">{product.brand}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">{product.description}</p>
        
        <div className="mt-4 flex items-end justify-between border-t pt-4">
          <div className="flex flex-col">
            {isPromo ? (
              <>
                <span className="text-xs text-gray-400 line-through">${product.price}</span>
                <span className="text-xl font-bold text-indigo-600">${product.discountPrice}</span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};