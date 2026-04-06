import { useEffect } from 'react';
import useSWR from 'swr';
import LocalApiService from '@/client/services/LocalApiService';

function useGetContentVersion() {
    const { data, isValidating, isLoading, mutate } = useSWR('content-version', () => LocalApiService.getContentVersion(), {
        refreshWhenHidden: false,
        revalidateOnFocus: true,
    });

    useEffect(() => {
        let intervalId;

        // Sync with :00 and :30 of the minute
        const msUntilNextSync = 30000 - (Date.now() % 30000);

        const timeoutId = setTimeout(() => {
            mutate();
            intervalId = setInterval(mutate, 30000);
        }, msUntilNextSync);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [mutate]);

    return {
        version: data?.version,
        isLoading: isLoading || isValidating,
    };
}

export default useGetContentVersion;
