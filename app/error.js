'use client';

import ErrorPage from '@/client/components/templates/ErrorPage';

export default function Error({ error, reset }) {
    console.error(error);
    return <ErrorPage reset={reset} />;
}
