import { getQuestions } from '@/client/lib/api';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AppStateContext = createContext();

/** Intro (0) + questions (1..N) + ThankYou + Outro → N + 3 steps. Fallback while content is loading. */
function totalStepsForContent(content) {
    const n = Array.isArray(content) ? content.length : 0;
    return n > 0 ? n + 3 : 5;
}

export const AppStateProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);
    const [cmsid, setCmsid] = useState(null);
    const [loadError, setLoadError] = useState(false);

    const [currentStep, setCurrentStep] = useState(0);
    const [bgStep, setBgStep] = useState(0);

    const totalSteps = useMemo(() => totalStepsForContent(content), [content]);

    const goToNextStep = useCallback(() => {
        setCurrentStep(val => (val + 1) % totalSteps);
    }, [totalSteps]);

    const goToNextBgStep = useCallback(() => {
        setBgStep(val => (val + 1) % totalSteps);
    }, [totalSteps]);

    useEffect(() => {
        // make sure when current step changes the bg step is set to the same step
        // sometimes it changes earlier, but never later

        setBgStep(currentStep);
    }, [currentStep]);

    useEffect(() => {
        async function getContent() {
            try {
                const data = await getQuestions();
                const questions = data?.data?.questions;
                const id = data?.data?.cmsid;

                if (
                    data?.success &&
                    typeof id === 'string' &&
                    id.length > 0 &&
                    Array.isArray(questions) &&
                    questions.length >= 1
                ) {
                    setContent(questions);
                    setCmsid(id);
                    setLoadError(false);
                } else {
                    setContent(null);
                    setCmsid(null);
                    setLoadError(true);
                }
            } catch {
                setContent(null);
                setCmsid(null);
                setLoadError(true);
            } finally {
                setLoading(false);
            }
        }

        getContent();
    }, []);

    return (
        <AppStateContext.Provider
            value={{
                currentStep,
                goToNextStep,
                bgStep,
                goToNextBgStep,
                totalSteps,

                loading,
                content,
                cmsid,
                loadError,
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
};

export default function useAppState() {
    return useContext(AppStateContext);
}
