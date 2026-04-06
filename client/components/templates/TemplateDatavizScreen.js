import { Stack } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import DatavizStub from '../common/DatavizStub';
import TemplateScreenStack from '../common/TemplateScreenStack';
import { useEffect, useState } from 'react';
import { getDataviz } from '@/client/lib/api';

const QUESTION_DISPLAY_MS = 30_000;

export default function DatavizTemplate({ data }) {
    const eventLogoUrl = toHttpsUrl(data?.fields?.eventLogo?.fields?.file?.url);
    const eventLogoAlt = data?.fields?.eventLogo?.fields?.title ?? 'Event logo';
    const questionnaire = data?.fields?.questionnaire;
    const questionnaireId = questionnaire?.sys?.id;

    const [results, setResults] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);

    useEffect(() => {
        if (!questionnaireId) return;

        getDataviz(questionnaireId)
            .then(({ success, data: payload, message }) => {
                if (success) {
                    if (payload?.length) {
                        const normalizedResults = payload.map(item => ({
                            title: item.question,
                            answers: item.answers.map(answer => ({
                                text: answer.answer,
                                value: answer.total_responses,
                            })),
                        }));

                        setResults(normalizedResults);
                    }
                } else {
                    console.error(message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [questionnaireId]);

    useEffect(() => {
        if (!results?.length) return;
        setQuestionIndex(0);
    }, [results]);

    useEffect(() => {
        if (!results || results.length <= 1) return;

        const id = setInterval(() => {
            setQuestionIndex(i => (i + 1) % results.length);
        }, QUESTION_DISPLAY_MS);

        return () => clearInterval(id);
    }, [results]);

    const currentQuestion = results?.[questionIndex] ?? null;
    const title = currentQuestion?.title;
    const answers = currentQuestion?.answers ?? null;

    return (
        <TemplateScreenStack
            eventLogoUrl={eventLogoUrl}
            eventLogoAlt={eventLogoAlt}>
            <Stack
                spacing={3}
                sx={{
                    flex: 1,
                    width: '100%',
                    minWidth: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '120px',
                    maxWidth: '2200px',
                    margin: '0 auto',
                }}>
                <DatavizStub
                    questionIndex={questionIndex}
                    title={title}
                    data={answers}
                />
            </Stack>
        </TemplateScreenStack>
    );
}
