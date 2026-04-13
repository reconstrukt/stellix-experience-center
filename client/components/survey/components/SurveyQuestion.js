import React from 'react';
import QuestionSingleAnswer from './QuestionSingleAnswer';
import QuestionMultiAnswer from './QuestionMultiAnswer';

function questionToProps(question) {
    return {
        questionPrompt: question?.prompt ?? '',
        questionOptions: question?.answers?.map(item => item.title) ?? [],
    };
}

export default function SurveyQuestion({ question }) {
    if (!question) {
        return null;
    }

    const { questionPrompt, questionOptions } = questionToProps(question);

    switch (question.question_type) {
        case 'Single Answer':
            return (
                <QuestionSingleAnswer
                    questionPrompt={questionPrompt}
                    questionOptions={questionOptions}
                />
            );
        case 'Top Three':
            return (
                <QuestionMultiAnswer
                    questionPrompt={questionPrompt}
                    questionOptions={questionOptions}
                />
            );
        default:
            return null;
    }
}
