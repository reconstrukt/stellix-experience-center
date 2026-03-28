import useSWR from 'swr';
import LocalApiService from '@/client/services/LocalApiService';

function useGetContentVersion() {
    const { data, isValidating, isLoading } = useSWR('content-version', () => LocalApiService.getContentVersion(), {
        refreshInterval: 30000,
        refreshWhenHidden: false,
        revalidateOnFocus: true,
    });

    return {
        version: data?.version,
        isLoading: isLoading || isValidating,
    };
}

export default useGetContentVersion;
