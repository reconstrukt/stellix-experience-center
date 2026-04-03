import { API_CONFIG } from '@/client/config/common';

const apiUrl = API_CONFIG.URL;
const apikey = API_CONFIG.KEY;

const fetchApi = async (endpoint, options = {}) => {
    const params = new URLSearchParams({
        apikey,
        ...options.params,
    });
    const response = await fetch(`${apiUrl}${endpoint}?${params}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.json();
};

export const postAnswers = ({ q1, a1, q2, a2, cmsid }) => {
    return fetchApi('/survey', {
        method: 'POST',
        body: JSON.stringify([
            { question: q1, answers: a1, cmsid },
            { question: q2, answers: a2, cmsid },
        ]),
    });
};

export const getQuestions = () => {
    return fetchApi('/questionnaire');
};

export const getDataviz = questionnaireId => {
    return fetchApi('/dataviz', {
        params: {
            questionnaireId,
        },
    });
};
