'use client';

import AppRoot from '@/client/components/survey/components/AppRoot';
import { FormProvider } from '@/client/components/survey/contexts/FormContext';
import { AppStateProvider } from '@/client/components/survey/contexts/AppStateContext';
import { Box } from '@mui/material';

export default function Survey() {
    return (
        <AppStateProvider>
            <FormProvider>
                <Box
                    sx={{
                        width: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                    <AppRoot />
                </Box>
            </FormProvider>
        </AppStateProvider>
    );
}
