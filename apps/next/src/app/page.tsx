import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className='bg-amber-50 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
            <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
                <h1 className='text-4xl font-bold text-blue-900'>Search your product</h1>
                <div className='grid w-full max-w-sm items-center gap-3'>
                    <Label htmlFor='email'>Product</Label>
                    <Input autoCapitalize={'off'} type='text' id='search' placeholder='Product' />
                    <Button className={'bg-blue-900'}>Submit</Button>
                </div>
            </main>
        </div>
    );
}
