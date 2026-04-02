import { API_CONFIG } from '@/client/config/common';

const apiUrl = API_CONFIG.URL;
const apikey = API_CONFIG.KEY;

const fetchApi = async (endpoint, options = {}) => {
    const response = await fetch(`${apiUrl}${endpoint}?apikey=${apikey}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const postAnswers = ({ q1, a1, q2, a2 }) => {
    return fetchApi('/survey', {
        method: 'POST',
        body: JSON.stringify([
            { question: q1, answers: a1 },
            { question: q2, answers: a2 },
        ]),
    });
};

export const getQuestions = () => {
    return fetchApi('/questionnaire');
};

export const getDataviz = () => {
    return fetchApi('/dataviz');
};
