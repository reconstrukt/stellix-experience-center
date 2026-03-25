'use client';

import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { IS_PRODUCTION } from '@/client/config/common';

function EntryPage({ entryId, data }) {
    const updatedData = useContentfulLiveUpdates(data, { skip: IS_PRODUCTION });
    console.log({ updatedData, skip: IS_PRODUCTION, IS_PRODUCTION });

    // Through this page, you should determine the entry type and then call the appropriate entry template
    // Careful: Use updatedData and not data to render the components down the line

    const contentTypeId = updatedData?.sys?.contentType?.sys?.id;

    if (contentTypeId === 'welcomeScreen') {
        return (
            <WelcomeScreenTemplate
                entryId={entryId}
                data={data}
            />
        );
    }

    return <pre>{JSON.stringify(updatedData, null, 2)}</pre>;
}

export default EntryPage;
