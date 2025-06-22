'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { searchProducts, submitFeedback, syncWithAirtable } from '@/lib/api';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Array<{ id: string; name: string; description: string }>>([]);

    const handleSubmit = () => {
        setLoading(true);

        if (!searchQuery || loading) return;

        searchProducts(searchQuery)
            .then(
                response => {
                    setProducts(response.data);
                },
                error => {
                    console.error(error);
                },
            )
            .finally(() => {
                setLoading(false);
            });

        return () => {
            setLoading(false);
        };
    };

    return (
        <div className='bg-amber-50 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            <main className='flex flex-col mx-auto gap-[32px] row-start-2 items-center sm:items-start'>
                <div className={'w-full flex flex-col gap-4 justify-center text-center'}>
                    <h1 className='text-4xl font-bold text-blue-900'>Search your product</h1>
                    <div className='flex flex-col gap-4 justify-center  mx-auto'>
                        <Input
                            value={searchQuery}
                            onChange={event => setSearchQuery(event.target.value)}
                            autoCapitalize={'off'}
                            type='text'
                            id='search'
                            placeholder='Product'
                            className={'w-full'}
                        />
                        <div className={'flex gap-4 justify-center w-full'}>
                            <Button
                                disabled={!searchQuery}
                                onClick={handleSubmit}
                                className={'bg-blue-900 w-1/2 cursor-pointer'}
                            >
                                Submit
                            </Button>
                            <Button
                                disabled={!searchQuery}
                                onClick={() => {
                                    setProducts([]);
                                    setSearchQuery('');
                                }}
                                className={'bg-red-900 w-1/2 cursor-pointer'}
                            >
                                Clear
                            </Button>
                            <Button
                                onClick={() => {
                                    syncWithAirtable().catch(console.error);
                                }}
                                className={'bg-green-900 w-1/2 cursor-pointer'}
                            >
                                Sync with Airtable
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-[1fr_1fr] gap-16'>
                    {products.map((product, index) => (
                        <div
                            onClick={() => {
                                let reward = 1;
                                if (index < 4) reward = Number((reward - index * 0.2).toPrecision(1));
                                else reward = 0.3;

                                submitFeedback({
                                    query: searchQuery,
                                    rank: index + 1,
                                    productId: product.id,
                                    reward,
                                }).catch(console.error);
                            }}
                            key={product.id}
                            className='hover:scale-105 duration-75 flex flex-col gap-4 border-2 p-4 rounded-md shadow-md shadow-accent cursor-pointer'
                        >
                            <h2 className='text-2xl font-bold'>{product.name}</h2>
                            <p className='text-base'>{product.description}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
