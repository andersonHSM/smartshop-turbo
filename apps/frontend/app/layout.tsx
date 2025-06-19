import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SmartShopper',
  description: 'AI-powered semantic product search using OpenAI embeddings + pgvector',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
        <main className="max-w-5xl mx-auto p-4 md:p-8">{children}</main>
      </body>
    </html>
  )
}
