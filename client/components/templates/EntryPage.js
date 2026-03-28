'use client';

import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { IS_PRODUCTION } from '@/client/config/common';
import TemplateResolver from '@/client/components/functional/TemplateResolver';

function EntryPage({ entryId, data }) {
    const updatedData = useContentfulLiveUpdates(data, { skip: IS_PRODUCTION });
    return (
        <TemplateResolver
            entryId={entryId}
            data={updatedData}
            fallback={<pre>{JSON.stringify(updatedData, null, 2)}</pre>}
        />
    );
}

export default EntryPage;
