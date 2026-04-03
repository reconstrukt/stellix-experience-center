import { getQuestions } from '@/client/lib/api';
import { createContext, useContext, useEffect, useState } from 'react';

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);
    const [loadError, setLoadError] = useState(false);

    const [currentStep, setCurrentStep] = useState(0); // 0 | 1 | 2 | 3 | 4
    const [bgStep, setBgStep] = useState(0);

    const goToNextStep = () => {
        setCurrentStep((val) => (val + 1) % 5);
    };

    const goToNextBgStep = () => {
        setBgStep((val) => (val + 1) % 5);
    };

    useEffect(() => {
        // make sure when current step changes the bg step is set to the same step
        // sometimes it changes earlier, but never later

        setBgStep(currentStep);
    }, [currentStep]);

    useEffect(() => {
        console.log(currentStep, bgStep);
    }, [currentStep, bgStep]);

    useEffect(() => {
        async function getContent() {
            try {
                const data = await getQuestions();
                const questions = data?.data?.questions;

                if (
                    data?.success &&
                    Array.isArray(questions) &&
                    questions.length >= 2
                ) {
                    setContent(questions);
                    setLoadError(false);
                } else {
                    setContent(null);
                    setLoadError(true);
                }
            } catch {
                setContent(null);
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

                loading,
                content,
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
