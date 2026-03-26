'use client';

import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { IS_PRODUCTION } from '@/client/config/common';
import WelcomeScreenTemplate from '@/client/components/templates/TemplateWelcomeScreen';
import EventScreenTemplate from '@/client/components/templates/TemplateEventScreen';
import AgendaScreenTemplate from '@/client/components/templates/TemplateAgendaScreen';
import SpeakerScreenTemplate from '@/client/components/templates/TemplateSpeakerScreen';

const CONTENT_TYPE_TO_TEMPLATE = {
    welcomeScreen: WelcomeScreenTemplate,
    eventInfo: EventScreenTemplate,
    agendaScreen: AgendaScreenTemplate,
    speakerInfo: SpeakerScreenTemplate,
};

function EntryPage({ entryId, data }) {
    const updatedData = useContentfulLiveUpdates(data, { skip: IS_PRODUCTION });
    console.log({ updatedData, skip: IS_PRODUCTION, IS_PRODUCTION });

    // Through this page, you should determine the entry type and then call the appropriate entry template
    // Careful: Use updatedData and not data to render the components down the line

    const contentTypeId = updatedData?.sys?.contentType?.sys?.id;

    const Template = CONTENT_TYPE_TO_TEMPLATE[contentTypeId];
    if (Template)
        return (
            <Template
                entryId={entryId}
                data={updatedData}
            />
        );

    return <pre>{JSON.stringify(updatedData, null, 2)}</pre>;
}

export default EntryPage;
