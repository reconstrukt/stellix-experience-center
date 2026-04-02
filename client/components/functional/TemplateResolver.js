'use client';

import WelcomeScreenTemplate from '@/client/components/templates/TemplateWelcomeScreen';
import EventScreenTemplate from '@/client/components/templates/TemplateEventScreen';
import AgendaScreenTemplate from '@/client/components/templates/TemplateAgendaScreen';
import SpeakerScreenTemplate from '@/client/components/templates/TemplateSpeakerScreen';
import FullScreenMediaTemplate from '@/client/components/templates/TemplateFullScreenMedia';
import DatavizTemplate from '@/client/components/templates/TemplateDatavizScreen';

const CONTENT_TYPE_TO_TEMPLATE = {
    welcomeScreen: WelcomeScreenTemplate,
    eventInfo: EventScreenTemplate,
    agendaScreen: AgendaScreenTemplate,
    speakerInfo: SpeakerScreenTemplate,
    fullScreenMedia: FullScreenMediaTemplate,
    dataviz: DatavizTemplate,
};

function TemplateResolver({ entryId, data, fallback = null }) {
    const contentTypeId = data?.sys?.contentType?.sys?.id;
    const Template = CONTENT_TYPE_TO_TEMPLATE[contentTypeId];

    if (Template) {
        return (
            <Template
                entryId={entryId}
                data={data}
            />
        );
    }

    return fallback;
}

export default TemplateResolver;
