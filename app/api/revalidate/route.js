import { NextResponse } from 'next/server';
import TempFileSystemService from '@/server/services/TempFileSystemService';
import { revalidateTag } from 'next/cache';
import { CONTENTFUL_NEXT_CACHE_TAG, CONTENTFUL_REVALIDATE_SECRET } from '@/client/config/contentful';

const revalidateContentTypes = ['agendaScreen', 'eventInfo', 'lobbyPlaylist', 'speakerInfo', 'welcomeScreen'];

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (secret !== CONTENTFUL_REVALIDATE_SECRET) {
        return NextResponse.json({
            error: 'Invalid request',
            revalidated: false,
        });
    }

    const version = Date.now();
    let body;
    let revalidated = false;
    try {
        try {
            body = await request.json();
        } catch (e) {
            console.log(e);
        }

        const contentType = body?.sys?.contentType?.sys?.id;

        if (revalidateContentTypes.includes(contentType)) {
            await TempFileSystemService.setVersion(version);
            revalidateTag(CONTENTFUL_NEXT_CACHE_TAG);
            revalidated = true;
        }
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

    return NextResponse.json({ success: true, revalidated, version });
}
