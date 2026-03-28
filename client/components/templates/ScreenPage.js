'use client';
import { useStore } from '@/client/components/functional/StoreProvider';
import TemplateResolver from '@/client/components/functional/TemplateResolver';

const screenMappings = {
    1: 'screenOne',
    2: 'screenTwo',
    3: 'screenThree',
};

function ScreenPage({ screenNumber }) {
    const { useValue } = useStore();
    const [contentValue] = useValue('content');
    const currentScreenEntry = contentValue?.data?.fields?.[screenMappings[Number(screenNumber)]];

    if (!currentScreenEntry) return null;

    return (
        <TemplateResolver
            entryId={currentScreenEntry?.sys?.id}
            data={currentScreenEntry}
        />
    );
}

export default ScreenPage;
