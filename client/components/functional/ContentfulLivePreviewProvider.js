import { IS_PRODUCTION } from '@/client/config/common';

function ContentfulLivePreviewProvider({ children }) {
    if (IS_PRODUCTION) return children;
    else return <ContentfulLivePreviewProvider locale="en-US">{children}</ContentfulLivePreviewProvider>;
}

export default ContentfulLivePreviewProvider;
