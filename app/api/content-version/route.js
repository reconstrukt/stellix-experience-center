import { NextResponse } from 'next/server';
import tempFileSystemService from '@/server/services/TempFileSystemService';

export async function GET() {
    const version = await tempFileSystemService.getVersion();
    return NextResponse.json({
        success: true,
        version,
    });
}
