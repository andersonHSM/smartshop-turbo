import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
    metadataBase: new URL('https://postgres-pgvector.vercel.app'),
    title: 'Vercel Postgres AI-powered Semantic Search Demo',
    description:
        'A Next.js app that uses Vercel Postgres with pgvector, Drizzle ORM, and OpenAI to power a semantic search.',
};

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.variable}>{children}</body>
        </html>
    );
}
