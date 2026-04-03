import { postAnswers } from '@/client/lib/api';
import { createContext, useContext, useEffect, useState } from 'react';
import useAppState from './AppStateContext';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const { content } = useAppState();
    const [answerOne, setAnswerOne] = useState([]);
    const [answerTwo, setAnswerTwo] = useState([]);

    const postData = async () => {
        if (!content?.[0] || !content?.[1]) {
            return;
        }

        console.log('Submitting...');
        console.log(answerOne, answerTwo);

        const data = await postAnswers({
            q1: content[0].prompt,
            a1: answerOne,
            q2: content[1].prompt,
            a2: answerTwo,
        });
        console.log('API RESPONSE', data);

        setAnswerOne([]);
        setAnswerTwo([]);
    };

    useEffect(() => {
        if (
            answerOne.length > 0 &&
            answerTwo.length > 0 &&
            content?.[0] &&
            content?.[1]
        ) {
            postData();
        }
    }, [answerOne, answerTwo, content]);

    return (
        <FormContext.Provider
            value={{
                setAnswerOne,
                setAnswerTwo,
                postData,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export default function useForm() {
    return useContext(FormContext);
}
