import { Stack } from '@mui/material';
import { toHttpsUrl } from '@/client/lib/url';
import DatavizStub from '../common/DatavizStub';
import TemplateScreenStack from '../common/TemplateScreenStack';
import { useEffect, useRef, useState } from 'react';
import { getDataviz } from '@/client/lib/api';

/** Time each question stays on screen before advancing or ending the cycle. */
const QUESTION_DISPLAY_MS = 30_000;
/** Poll the API on this interval; updates apply at cycle boundary only. */
const POLL_INTERVAL_MS = 15_000;
/** After the last question, pause before merging live data and showing Q1 again. */
const CYCLE_REFRESH_PAUSE_MS = 1_000;

function normalizeDatavizPayload(payload) {
    return payload.map(item => ({
        title: item.question,
        answers: item.answers.map(answer => ({
            text: answer.answer,
            value: answer.total_responses,
        })),
    }));
}

export default function DatavizTemplate({ data }) {
    const eventLogoUrl = toHttpsUrl(data?.fields?.eventLogo?.fields?.file?.url);
    const eventLogoAlt = data?.fields?.eventLogo?.fields?.title ?? 'Event logo';
    const questionnaire = data?.fields?.questionnaire;
    const questionnaireId = questionnaire?.sys?.id;
    const subtitle = data?.fields?.subtitle ?? null;

    /** Data currently on screen (stable until end-of-cycle merge). */
    const [results, setResults] = useState(null);
    /** Newest API snapshot (ref only); merged into `results` at end of each cycle. */
    const latestResultsRef = useRef(null);
    const [questionIndex, setQuestionIndex] = useState(0);

    const questionIndexRef = useRef(0);

    useEffect(() => {
        questionIndexRef.current = questionIndex;
    }, [questionIndex]);

    useEffect(() => {
        if (!questionnaireId) return;

        const fetchLive = () => {
            getDataviz(questionnaireId)
                .then(({ success, data: payload, message }) => {
                    if (!success) {
                        console.error(message);
                        return;
                    }
                    if (!payload?.length) return;

                    const normalized = normalizeDatavizPayload(payload);
                    latestResultsRef.current = normalized;

                    setResults(prev => (prev == null ? normalized : prev));
                })
                .catch(error => {
                    console.error(error);
                });
        };

        fetchLive();
        const pollId = setInterval(fetchLive, POLL_INTERVAL_MS);
        return () => clearInterval(pollId);
    }, [questionnaireId]);

    useEffect(() => {
        if (!results?.length) return;

        let cancelled = false;
        let timeoutId;

        const n = results.length;

        const mergeLatestAndContinue = onEffectRestart => {
            const fresh = latestResultsRef.current;
            if (fresh?.length) {
                setResults(fresh);
            }
            setQuestionIndex(0);
            questionIndexRef.current = 0;
            if (!fresh?.length) {
                onEffectRestart();
            }
        };

        const run = () => {
            timeoutId = setTimeout(() => {
                if (cancelled) return;

                const i = questionIndexRef.current;

                if (n === 1) {
                    timeoutId = setTimeout(() => {
                        if (cancelled) return;
                        mergeLatestAndContinue(run);
                    }, CYCLE_REFRESH_PAUSE_MS);
                    return;
                }

                if (i < n - 1) {
                    const next = i + 1;
                    questionIndexRef.current = next;
                    setQuestionIndex(next);
                    run();
                    return;
                }

                timeoutId = setTimeout(() => {
                    if (cancelled) return;
                    mergeLatestAndContinue(run);
                }, CYCLE_REFRESH_PAUSE_MS);
            }, QUESTION_DISPLAY_MS);
        };

        run();

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
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
                    minHeight: 0,
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    gap: '120px',
                    maxWidth: '2200px',
                    margin: '0 auto',
                }}>
                <DatavizStub
                    questionIndex={questionIndex}
                    title={title}
                    subtitle={subtitle}
                    data={answers}
                />
            </Stack>
        </TemplateScreenStack>
    );
}
