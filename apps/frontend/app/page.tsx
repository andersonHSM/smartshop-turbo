import { SearchForm } from '@/components/search-form'
import { SearchResults } from '@/components/search-results'
import { searchProducts } from '@/lib/search'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.query === 'string' ? searchParams.query : ''
  const products = query ? await searchProducts(query) : []

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">SmartShopper</h1>
        <p className="text-gray-500">
          Find products using natural language search powered by OpenAI embeddings and pgvector.
        </p>
      </div>

      <SearchForm query={query} />

      {query && <SearchResults query={query} products={products} />}
    </div>
  )
}
