import { Box, Stack, Typography } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import DatavizStub from '../common/DatavizStub';
import MotionWrapper from '../common/MotionWrapper';
import { useEffect, useState } from 'react';
import { getDataviz } from '@/client/lib/api';

const QUESTION_DISPLAY_MS = 10_000;

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
        <Stack
            sx={{
                minHeight: '100vh',
                width: '100%',
                px: 4,
                py: 6,
                pb: '400px',
                position: 'relative',
                overflowX: 'hidden',
                WebkitTextSizeAdjust: '100%',
                textSizeAdjust: '100%',
            }}>
            <Stack
                spacing={3}
                sx={{
                    flex: 1,
                    width: '100%',
                    minWidth: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '60px',
                    maxWidth: '1100px',
                    margin: '0 auto',
                }}>
                <MotionWrapper
                    mounted={true}
                    index={0}>
                    {title ? (
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                textAlign: 'center',
                                whiteSpace: 'pre-wrap',
                                maxWidth: '100%',
                                overflowWrap: 'anywhere',
                                wordBreak: 'break-word',
                            }}>
                            {title}
                        </Typography>
                    ) : null}
                </MotionWrapper>

                <DatavizStub
                    key={questionIndex}
                    data={answers}
                />
            </Stack>

            {eventLogoUrl ? (
                <Box
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bottom: '0px',
                    }}>
                    <MotionWrapper
                        mounted={true}
                        index={4}>
                        <Box
                            component="img"
                            src={eventLogoUrl}
                            alt={eventLogoAlt}
                            sx={{
                                width: '301px',
                                height: '290px',
                                objectFit: 'contain',
                            }}
                        />
                    </MotionWrapper>
                </Box>
            ) : null}
        </Stack>
    );
}
