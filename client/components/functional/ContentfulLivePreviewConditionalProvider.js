'use client';

import { IS_PRODUCTION } from '@/client/config/common';
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react';

function ContentfulLivePreviewConditionalProvider({ children }) {
    if (IS_PRODUCTION) return <>{children}</>;
    else return <ContentfulLivePreviewProvider locale="en-US">{children}</ContentfulLivePreviewProvider>;
}

export default ContentfulLivePreviewConditionalProvider;
