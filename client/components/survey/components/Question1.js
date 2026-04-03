import React, { useMemo, useState } from 'react';
import Wrapper from './shared/Wrapper';
import Title from './shared/Title';
import { Button, Box, Stack } from '@mui/material';
import useAppState from '@/client/components/survey/contexts/AppStateContext';
import palette from '@/client/lib/palette';
import useForm from '@/client/components/survey/contexts/FormContext';
import MotionWrapper from './shared/MotionWrapper';
import NextButton from './shared/NextButton';

export default function Question1() {
    const { goToNextStep, goToNextBgStep, content } = useAppState();
    const { setAnswerOne } = useForm();
    const [clicked, setClicked] = useState('');
    const [out, setOut] = useState(false);

    const questionPrompt = useMemo(
        () => content?.[0]?.prompt ?? '',
        [content]
    );
    const questionOptions = useMemo(
        () => content?.[0]?.answers?.map((item) => item.title) ?? [],
        [content]
    );

    if (!content?.[0]) {
        return null;
    }

    const handleClick = (option) => {
        setClicked(option);
    };

    const handleSubmit = () => {
        if (!clicked) return;

        setAnswerOne([clicked]);
        setOut(true);
        goToNextBgStep();

        setTimeout(() => {
            goToNextStep();
        }, 1000);
    };

    return (
        <Wrapper>
            <MotionWrapper mounted={!out}>
                <Title>{questionPrompt}</Title>
            </MotionWrapper>

            <Stack
                sx={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '100px',
                }}
            >
                {questionOptions.map((option, index) => (
                    <Box
                        sx={{
                            mb: '22px',
                        }}
                        key={index}
                    >
                        <MotionWrapper index={index + 1} mounted={!out}>
                            <Button
                                variant="contained"
                                sx={{
                                    height: 57,
                                    borderRadius: 30,
                                    padding: '0 40px',
                                    fontWeight: 300,
                                    fontSize: 25,
                                    textTransform: 'none',
                                    background:
                                        clicked === option
                                            ? palette.yellow
                                            : palette.offWhite,
                                    color: 'black',
                                }}
                                onClick={() => handleClick(option)}
                            >
                                {option}
                            </Button>
                        </MotionWrapper>
                    </Box>
                ))}
            </Stack>

            <MotionWrapper mounted={!out} index={questionOptions.length + 1}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '100px',
                    }}
                >
                    <NextButton onClick={handleSubmit} disabled={!clicked}>
                        Next
                    </NextButton>
                </Box>
            </MotionWrapper>
        </Wrapper>
    );
}
