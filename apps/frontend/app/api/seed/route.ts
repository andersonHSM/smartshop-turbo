import { NextResponse } from 'next/server';
import { setupDatabase, seedSampleProducts } from '@/lib/db';

export async function GET() {
  try {
    await setupDatabase();
    await seedSampleProducts();

    return NextResponse.json({ success: true, message: 'Database setup complete' });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json({ success: false, error: 'Failed to setup database' }, { status: 500 });
  }
}
