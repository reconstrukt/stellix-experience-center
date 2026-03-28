import useGetContentVersion from '@/client/hooks/useGetContentVersion';
import { useStore } from '@/client/components/functional/StoreProvider';
import { useEffect } from 'react';
import ContentfulService from '@/client/services/ContentfulService';

function ContentLoader() {
    const { version } = useGetContentVersion();
    const { useValue } = useStore();
    const [contentVersionValue, setContentVersionValue] = useValue('contentVersion');
    const [, setContentValue] = useValue('content');

    const loadContent = async version => {
        const res = await ContentfulService.getMostRecentlyPublishedLobbyPlaylist();
        setContentValue({
            isLoading: false,
            data: res,
        });
        setContentVersionValue(version);
    };

    useEffect(() => {
        if (version !== contentVersionValue) {
            console.log('Updating content version / loading new content version');
            loadContent(version);
        }
    }, [version, contentVersionValue]);

    return null;
}

export default ContentLoader;
