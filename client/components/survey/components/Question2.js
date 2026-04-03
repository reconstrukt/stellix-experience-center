import React, { useEffect, useState, useMemo } from 'react';
import Wrapper from './shared/Wrapper';
import Title from './shared/Title';
import { Button, Box, Stack } from '@mui/material';
import useAppState from '@/client/components/survey/contexts/AppStateContext';
import palette from '@/client/lib/palette';
import useForm from '@/client/components/survey/contexts/FormContext';
import MotionWrapper from './shared/MotionWrapper';
import NextButton from './shared/NextButton';

export default function Question2() {
    const { goToNextStep, goToNextBgStep, content } = useAppState();
    const { setAnswerTwo } = useForm();

    const [selected, setSelected] = useState([]);
    const [out, setOut] = useState(false);

    const questionPrompt = useMemo(() => content?.[1]?.prompt ?? '', [content]);
    const questionOptions = useMemo(() => content?.[1]?.answers?.map(item => item.title) ?? [], [content]);

    if (!content?.[1]) {
        return null;
    }

    const handleSelect = option => {
        if (selected.includes(option)) return;
        if (selected.length === 3) return;

        setSelected(val => {
            const ret = [...val];
            ret.push(option);
            return ret;
        });
    };

    const handleClear = () => {
        setSelected([]);
    };

    const handleSubmit = () => {
        if (selected.length === 0) return;

        setAnswerTwo(selected);
        setOut(true);
        goToNextBgStep();

        setTimeout(() => {
            goToNextStep();
        }, 1500);
    };

    return (
        <Wrapper>
            <MotionWrapper mounted={!out}>
                <Title>{questionPrompt}</Title>
            </MotionWrapper>

            <MotionWrapper
                mounted={!out}
                index={1}>
                <Box
                    sx={{
                        mt: '20px',
                        fontSize: 30,
                        textAlign: 'center',
                        fontWeight: 400,
                    }}>
                    Select and rank up to three
                </Box>
            </MotionWrapper>

            <MotionWrapper
                mounted={!out}
                index={2}>
                <Stack
                    sx={{
                        mt: '40px',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '22px',
                    }}>
                    {Array.from({ length: 3 }).map((field, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: 615,
                                height: 60,
                                borderRadius: 100,
                                paddingLeft: '74px',
                                paddingRight: '30px',
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative',

                                fontSize: 25,
                                fontWeight: 300,

                                transition: 'all 0.4s ease',

                                backgroundColor: selected.length > index ? palette.teal : palette.charcoal,
                                color: palette.black,
                            }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: 44,
                                    height: 44,
                                    left: 8,
                                    top: 8,
                                    borderRadius: 44,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    fontSize: 29,
                                    color: palette.black,

                                    transition: 'all 0.4s ease',
                                    backgroundColor: selected.length > index ? palette.white : palette.teal,
                                }}>
                                {index + 1}
                            </Box>

                            <Box
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                {selected.length > index ? selected[index] : ''}
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </MotionWrapper>

            <MotionWrapper
                mounted={!out}
                index={3}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    gap="14px"
                    sx={{
                        mt: '40px',
                    }}>
                    <NextButton
                        onClick={handleClear}
                        sx={{
                            fontWeight: 400,
                            border: `3px solid ${palette.charcoal}`,
                            color: palette.charcoal,
                            background: 'transparent',
                        }}>
                        Clear
                    </NextButton>
                    <NextButton
                        onClick={handleSubmit}
                        disabled={selected.length === 0}>
                        Submit
                    </NextButton>
                </Stack>
            </MotionWrapper>

            <Box
                sx={{
                    maxWidth: 830,
                    margin: '0 auto',
                    mt: '80px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '24px 14px',
                    justifyContent: 'center',
                }}>
                {questionOptions.map((option, index) => (
                    <Box key={index}>
                        <MotionWrapper
                            mounted={!out}
                            index={4 + index}>
                            <Button
                                onClick={() => handleSelect(option)}
                                sx={{
                                    height: 57,
                                    borderRadius: 30,
                                    padding: '0 30px',
                                    fontWeight: 300,
                                    fontSize: 25,
                                    textTransform: 'none',
                                    background: palette.offWhite,
                                    color: 'black',

                                    opacity: selected.includes(option) ? 0.4 : 1,
                                    transition: 'opacity 0.1s ease',
                                }}>
                                {option}
                            </Button>
                        </MotionWrapper>
                    </Box>
                ))}
            </Box>
        </Wrapper>
    );
}
