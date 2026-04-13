import { postAnswers } from '@/client/lib/api';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import useAppState from './AppStateContext';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const { content, cmsid } = useAppState();
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const n = content?.length ?? 0;
        if (n > 0) {
            setAnswers(Array.from({ length: n }, () => []));
        } else {
            setAnswers([]);
        }
    }, [content]);

    const setAnswerAt = useCallback((index, value) => {
        setAnswers(prev => {
            const next = [...prev];
            next[index] = value;
            return next;
        });
    }, []);

    const postData = async () => {
        if (!content?.length || !cmsid) {
            return;
        }

        console.log('Submitting...', answers);

        const items = content.map((q, i) => ({
            question: q.prompt,
            answers: answers[i],
            cmsid,
        }));

        const data = await postAnswers(items);
        console.log('API RESPONSE', data);

        setAnswers(Array.from({ length: content.length }, () => []));
    };

    useEffect(() => {
        if (!content?.length || !cmsid) {
            return;
        }
        if (answers.length !== content.length) {
            return;
        }
        const allAnswered = answers.every(a => Array.isArray(a) && a.length > 0);
        if (!allAnswered) {
            return;
        }
        postData();
    }, [answers, content, cmsid]);

    return (
        <FormContext.Provider
            value={{
                setAnswerAt,
                postData,
            }}>
            {children}
        </FormContext.Provider>
    );
};

export default function useForm() {
    return useContext(FormContext);
}
