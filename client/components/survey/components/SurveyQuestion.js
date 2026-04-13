import React from 'react';
import useAppState from '@/client/components/survey/contexts/AppStateContext';
import QuestionSingleAnswer from './QuestionSingleAnswer';
import QuestionMultiAnswer from './QuestionMultiAnswer';

function questionToProps(question) {
    return {
        questionPrompt: question?.prompt ?? '',
        questionOptions: question?.answers?.map(item => item.title) ?? [],
    };
}

export default function SurveyQuestion({ question, questionIndex }) {
    const { content } = useAppState();

    if (!question) {
        return null;
    }

    const { questionPrompt, questionOptions } = questionToProps(question);
    const isLastQuestion =
        Array.isArray(content) && content.length > 0 && questionIndex === content.length - 1;

    switch (question.question_type) {
        case 'Single Answer':
            return (
                <QuestionSingleAnswer
                    questionIndex={questionIndex}
                    isLastQuestion={isLastQuestion}
                    questionPrompt={questionPrompt}
                    questionOptions={questionOptions}
                />
            );
        case 'Top Three':
            return (
                <QuestionMultiAnswer
                    questionIndex={questionIndex}
                    isLastQuestion={isLastQuestion}
                    questionPrompt={questionPrompt}
                    questionOptions={questionOptions}
                />
            );
        default:
            return null;
    }
}
