import { useEffect } from 'react';
import useSWR from 'swr';
import LocalApiService from '@/client/services/LocalApiService';

const DAY_START_HOUR = 7;
const NIGHT_START_HOUR = 19;
const MIN_DELAY = 30_000; // safety floor (30s)

function isDaytimePollingWindow(date = new Date()) {
    const hour = date.getHours();
    return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR;
}

function getMsUntilNextAlignedPoll(date = new Date()) {
    const now = new Date(date);
    const next = new Date(date);

    next.setSeconds(0, 0);

    if (isDaytimePollingWindow(now)) {
        // Move to next even minute
        next.setMinutes(next.getMinutes() + 1);

        if (next.getMinutes() % 2 !== 0) {
            next.setMinutes(next.getMinutes() + 1);
        }

        // Avoid very short delays
        if (next - now < 60_000) {
            next.setMinutes(next.getMinutes() + 2);
        }
    } else {
        // Move to next top of hour
        next.setHours(next.getHours() + 1, 0, 0, 0);

        // Avoid very short delays
        if (next - now < 5 * 60_000) {
            next.setHours(next.getHours() + 1);
        }
    }

    return next.getTime() - now.getTime();
}

function useGetContentVersion() {
    const { data, isValidating, isLoading, mutate } = useSWR(
        'content-version',
        () => LocalApiService.getContentVersion(),
        {
            refreshWhenHidden: false,
            revalidateOnFocus: true,
        },
    );

    useEffect(() => {
        let timeoutId;
        let isCancelled = false;

        const scheduleNextPoll = () => {
            if (isCancelled) return;

            const delay = Math.max(getMsUntilNextAlignedPoll(), MIN_DELAY);

            timeoutId = setTimeout(async () => {
                try {
                    await mutate();
                } catch {
                    // ignore errors, keep polling
                } finally {
                    scheduleNextPoll();
                }
            }, delay);
        };

        scheduleNextPoll();

        return () => {
            isCancelled = true;
            clearTimeout(timeoutId);
        };
    }, [mutate]);

    return {
        version: data?.version,
        isLoading: isLoading || isValidating,
    };
}

export default useGetContentVersion;
