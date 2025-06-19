import { Product } from '@/lib/types'

export function SearchResults({ query, products }: { query: string; products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found for "{query}"</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Results for "{query}"</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
            <p className="mt-2">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold">${product.price.toFixed(2)}</span>
              <div className="text-sm bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                {Math.round(product.similarity * 100)}% match
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
