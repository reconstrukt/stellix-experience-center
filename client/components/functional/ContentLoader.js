import useGetContentVersion from '@/client/hooks/useGetContentVersion';
import { useStore } from '@/client/components/functional/StoreProvider';
import { useEffect } from 'react';

function ContentLoader() {
    const { version } = useGetContentVersion();
    const { useValue } = useStore();
    const [contentVersionValue, setContentVersionValue] = useValue('contentVersion');

    useEffect(() => {
        if (version !== contentVersionValue) {
            // TODO: update here (except for the first time?)
            console.log('Updating content version');
            setContentVersionValue(version);
        }
    }, [version, contentVersionValue]);

    return null;
}

export default ContentLoader;
