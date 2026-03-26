import { useEffect, useState } from 'react';

export default function useDeviceNow({ updateIntervalMs = 1000 } = {}) {
    const [now, setNow] = useState(null);

    useEffect(() => {
        setNow(new Date());
        const id = setInterval(() => setNow(new Date()), updateIntervalMs);
        return () => clearInterval(id);
    }, [updateIntervalMs]);

    return now;
}
