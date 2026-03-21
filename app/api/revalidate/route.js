import { NextResponse } from 'next/server';
import tempFileSystemService from '@/server/services/TempFileSystemService';

export async function GET() {
    const version = Date.now();
    try {
        await tempFileSystemService.setVersion(version);
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update content version',
                details: error instanceof Error ? error.message : 'unknown error',
            },
            { status: 500 },
        );
    }

    return NextResponse.json({ success: true, version });
}
