'use client'

import { useState } from 'react';
import { searchProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const data = await searchProducts(query);
        setResults(data);
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>SmartShopper Search</h1>
            <input
                type='text'
                placeholder='Search products...'
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{ width: '300px', marginRight: '1rem' }}
            />
            <button onClick={handleSearch}>Search</button>

            <div style={{ marginTop: '2rem' }}>
                {results.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
