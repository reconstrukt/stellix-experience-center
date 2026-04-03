import React, { useEffect } from 'react';
import useAppState from '@/client/components/survey/contexts/AppStateContext';

export default function Outro() {
    const { goToNextStep } = useAppState();

    useEffect(() => {
        const timeout = setTimeout(goToNextStep, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return '';
}
