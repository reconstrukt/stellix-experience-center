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

/** @param {Array<{ question: string, answers: unknown[], cmsid: string }>} items */
export const postAnswers = items => {
    return fetchApi('/survey', {
        method: 'POST',
        body: JSON.stringify(items),
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
