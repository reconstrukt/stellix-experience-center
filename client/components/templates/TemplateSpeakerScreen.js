import { Stack, Typography } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import MotionWrapper from '../common/MotionWrapper';
import TemplateScreenStack from '../common/TemplateScreenStack';
import TemplateMultiSpeaker from './TemplateMultiSpeaker';
import TemplateSingleSpeaker from './TemplateSingleSpeaker';

const SPEAKER_SUFFIXES = ['One', 'Two', 'Three'];

function speakerFromFields(fields, index) {
    const num = SPEAKER_SUFFIXES[index];
    const name = fields[`speaker${num}Name`] ?? '';
    const photoField = fields[`speaker${num}Photo`];
    return {
        role: fields[`speaker${num}Role`] ?? '',
        name,
        title: fields[`speaker${num}Title`] ?? '',
        bio: fields[`speaker${num}Bio`] ?? '',
        photoUrl: toHttpsUrl(photoField?.fields?.file?.url),
        photoAlt: photoField?.fields?.title ?? name ?? 'Speaker portrait',
    };
}

function speakersWithNames(fields) {
    return [0, 1, 2].map(i => speakerFromFields(fields, i)).filter(s => String(s.name ?? '').trim());
}

export default function SpeakerScreenTemplate({ data }) {
    const fields = data?.fields ?? {};
    const eventType = fields.eventType ?? '';
    const eventLogoUrl = toHttpsUrl(fields.eventLogo?.fields?.file?.url);
    const eventLogoAlt = fields.eventLogo?.fields?.title ?? 'Event logo';

    const namedSpeakers = speakersWithNames(fields);
    const useMultiSpeaker = namedSpeakers.length >= 2;
    const singleSpeaker = namedSpeakers.length === 1 ? namedSpeakers[0] : speakerFromFields(fields, 0);

    return (
        <TemplateScreenStack
            eventLogoUrl={eventLogoUrl}
            eventLogoAlt={eventLogoAlt}
            eventLogoMotionIndex={6}>
            <Stack
                sx={{
                    flex: 1,
                    width: '100%',
                    margin: '0 auto',
                    gap: '112px',
                    justifyContent: 'center',
                }}>
                <MotionWrapper
                    mounted={true}
                    index={0}>
                    {eventType ? (
                        <Typography
                            variant="h3"
                            sx={{
                                textAlign: 'center',
                                whiteSpace: 'pre-wrap',
                                pb: 6,
                            }}>
                            {eventType}
                        </Typography>
                    ) : null}
                </MotionWrapper>

                {useMultiSpeaker ? (
                    <TemplateMultiSpeaker speakers={namedSpeakers} />
                ) : (
                    <TemplateSingleSpeaker speaker={singleSpeaker} />
                )}
            </Stack>
        </TemplateScreenStack>
    );
}
