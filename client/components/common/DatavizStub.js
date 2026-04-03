'use client';

import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react';

const DATAVIZ_LIST_CONTAINER = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.05,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const DATAVIZ_ROW_ITEM = {
    initial: { opacity: 0, y: 40 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
    exit: {
        opacity: 0,
        y: -40,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const ROW_HEIGHT = 104;
const LINE_GAP = 16;

const MIN_RX_FRAC = 0.07;
const MAX_RX_FRAC = 0.42;

const DISC_FILLS = ['#E0B03C', '#92C83E', '#33B2C1', '#3B4752'];

/** Top-3 label pill (Figma node 2:42 — Welcome Screen Templates) */
const RANK_LABEL_BG = '#E2E2E2';
const RANK_LABEL_TEXT = '#000000';

/**
 * Map value to a quartile band on [min, max]: top 25% → 0, …, bottom 25% → 3.
 * Same numeric value always yields the same index.
 */
function valueQuartileColorIndex(value, minVal, maxVal) {
    if (maxVal === minVal) {
        return 3;
    }
    const t = (value - minVal) / (maxVal - minVal);
    if (t >= 0.75) return 0;
    if (t >= 0.5) return 1;
    if (t >= 0.25) return 2;
    return 3;
}

function discRy(rowIndex, rowCount, rowHeight) {
    const ryMin = rowHeight * 0.09;
    const ryMax = rowHeight * 1;
    if (rowCount <= 1) {
        return rowHeight * 0.28;
    }
    const mid = (rowCount - 1) / 2;
    const dist = Math.abs(rowIndex - mid) / mid;
    return ryMin + dist * (ryMax - ryMin);
}

/** Middle rows on top, edge rows behind — matches perspective (front vs back). */
function rowStackZIndex(rowIndex, rowCount) {
    if (rowCount <= 1) {
        return 1;
    }
    const mid = (rowCount - 1) / 2;
    const dist = Math.abs(rowIndex - mid) / mid;
    return Math.round((1 - dist) * 100);
}

function normalizeData(data) {
    if (!Array.isArray(data)) return [];
    return data.filter(d => d && typeof d.text === 'string' && Number.isFinite(Number(d.value)));
}

function DiscRow({ row, rowIndex, rowCount, maxValue, dataMin, dataMax, rank }) {
    const textRight = rank != null;
    const rowRef = useRef(null);
    const textRef = useRef(null);
    const filterId = `dvz-glow-${useId().replace(/:/g, '')}`;
    const [rowW, setRowW] = useState(0);
    const [rowH, setRowH] = useState(ROW_HEIGHT);
    const [lineX1, setLineX1] = useState(0);
    const [lineX2, setLineX2] = useState(0);
    const [textCenterY, setTextCenterY] = useState(ROW_HEIGHT / 2);

    useLayoutEffect(() => {
        const rowEl = rowRef.current;
        const textEl = textRef.current;
        if (!rowEl || !textEl) return;

        const measure = () => {
            const rowRect = rowEl.getBoundingClientRect();
            const textRect = textEl.getBoundingClientRect();
            const bl = rowEl.clientLeft;
            const bt = rowEl.clientTop;
            const safeW = rowEl.clientWidth || rowRect.width;
            const v = Number(row.value);
            const rx = safeW * (MIN_RX_FRAC + (v / maxValue) * (MAX_RX_FRAC - MIN_RX_FRAC));
            const cx = safeW / 2;

            let x1;
            let x2;
            if (textRight) {
                const leftOfText = textRect.left - rowRect.left - bl;
                // Disc-side endpoint at horizontal center (not ellipse edge)
                x1 = cx;
                x2 = leftOfText - LINE_GAP;
            } else {
                const rightOfText = textRect.right - rowRect.left - bl;
                x1 = rightOfText + LINE_GAP;
                x2 = cx;
            }
            const centerY = textRect.top + textRect.height / 2 - rowRect.top - bt;

            setRowW(safeW);
            setRowH(Math.max(ROW_HEIGHT, rowEl.offsetHeight));
            setLineX1(Number.isFinite(x1) ? x1 : 0);
            setLineX2(Number.isFinite(x2) ? x2 : 0);
            setTextCenterY(Number.isFinite(centerY) ? centerY : rowEl.clientHeight / 2);
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(rowEl);
        ro.observe(textEl);
        return () => ro.disconnect();
    }, [row.text, row.value, maxValue, textRight, rank]);

    const safeW = Math.max(rowW, 1);
    const safeH = Math.max(rowH, ROW_HEIGHT);
    const cx = safeW / 2;
    const v = Number(row.value);
    const rx = safeW * (MIN_RX_FRAC + (v / maxValue) * (MAX_RX_FRAC - MIN_RX_FRAC));
    const ry = discRy(rowIndex, rowCount, ROW_HEIGHT);
    const textY = Math.min(Math.max(0, textCenterY), safeH);
    const fill = DISC_FILLS[valueQuartileColorIndex(v, dataMin, dataMax)];
    const dotR = 6;

    const lineLeft = Math.min(lineX1, lineX2);
    const lineRight = Math.max(lineX1, lineX2);
    const showLine = lineRight - lineLeft > 0.5;

    const discW = 2 * rx;
    const discH = 2 * ry;

    return (
        <Box
            ref={rowRef}
            sx={{
                position: 'relative',
                width: '100%',
                minHeight: ROW_HEIGHT,
                py: 0.5,
                overflow: 'visible',
            }}>
            {rank != null ? (
                <Box
                    sx={{
                        position: 'relative',
                        zIndex: 3,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}>
                    <Box
                        ref={textRef}
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: { xs: '14px', sm: '16.65px' },
                            width: 'fit-content',
                            maxWidth: '100%',
                            boxSizing: 'border-box',
                            px: '21.5px',
                            py: '21.5px',
                            borderRadius: '46px',
                            backgroundColor: RANK_LABEL_BG,
                        }}>
                        <Box
                            sx={{
                                width: { xs: 44, sm: 52 },
                                height: { xs: 44, sm: 52 },
                                borderRadius: '50%',
                                bgcolor: DISC_FILLS[rank - 1],
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                            <Typography
                                component="span"
                                sx={{
                                    color: RANK_LABEL_TEXT,
                                    fontWeight: 500,
                                    fontSize: { xs: '26px', sm: '30px' },
                                    lineHeight: 1,
                                }}>
                                {rank}
                            </Typography>
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                color: RANK_LABEL_TEXT,
                                fontWeight: 500,
                                textAlign: 'left',
                                flex: '0 1 auto',
                                minWidth: 0,
                                fontSize: { xs: '27px', sm: '35px' },
                                lineHeight: 1.25,
                                overflowWrap: 'break-word',
                            }}>
                            {row.text}
                        </Typography>
                    </Box>
                </Box>
            ) : (
                <Typography
                    ref={textRef}
                    variant="body1"
                    sx={{
                        position: 'relative',
                        zIndex: 3,
                        display: 'inline-block',
                        verticalAlign: 'top',
                        maxWidth: '100%',
                        width: 'fit-content',
                        pr: 1,
                        textAlign: 'left',
                        fontSize: { xs: '27px', sm: '33px' },
                        lineHeight: 1.25,
                        overflowWrap: 'break-word',
                    }}>
                    {row.text}
                </Typography>
            )}

            <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                width="100%"
                height={safeH}
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    display: 'block',
                    pointerEvents: 'none',
                    overflow: 'visible',
                    zIndex: 2,
                }}
                viewBox={`0 0 ${safeW} ${safeH}`}
                preserveAspectRatio="none">
                {showLine ? (
                    <line
                        x1={lineX1}
                        y1={textY}
                        x2={lineX2}
                        y2={textY}
                        stroke="rgba(255,255,255,0.45)"
                        strokeWidth={4}
                        strokeDasharray="4 24"
                        strokeLinecap="round"
                    />
                ) : null}
            </svg>

            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: `${textY}px`,
                    transform: 'translate(-50%, -50%)',
                    width: `${discW}px`,
                    height: `${discH}px`,
                    pointerEvents: 'none',
                    zIndex: 0,
                }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                    width="100%"
                    height="100%"
                    overflow="visible"
                    viewBox={`0 0 ${discW} ${discH}`}
                    preserveAspectRatio="none">
                    <defs>
                        <filter
                            id={filterId}
                            x="-40%"
                            y="-40%"
                            width="180%"
                            height="180%">
                            <feGaussianBlur
                                stdDeviation="2.4"
                                result="b"
                            />
                            <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <ellipse
                        cx={rx}
                        cy={ry}
                        rx={rx}
                        ry={ry}
                        fill={fill}
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth={2}
                        filter={`url(#${filterId})`}
                    />
                    <circle
                        cx={rx}
                        cy={ry}
                        r={dotR}
                        fill="rgba(255,255,255,0.95)"
                    />
                </svg>
            </Box>
        </Box>
    );
}

export default function DatavizStub({ data, questionIndex = 0, title }) {
    const rows = useMemo(() => normalizeData(data), [data]);

    const { maxValue, dataMin, dataMax } = useMemo(() => {
        if (rows.length === 0) {
            return { maxValue: 1, dataMin: 0, dataMax: 0 };
        }
        const nums = rows.map(r => Number(r.value));
        const lo = Math.min(...nums);
        const hi = Math.max(...nums);
        return {
            maxValue: Math.max(1, hi),
            dataMin: lo,
            dataMax: hi,
        };
    }, [rows]);

    const topThreeRankByIndex = useMemo(() => {
        if (rows.length === 0) return new Map();
        const indexed = rows.map((row, i) => ({ i, v: Number(row.value) }));
        indexed.sort((a, b) => b.v - a.v || a.i - b.i);
        const map = new Map();
        indexed.slice(0, Math.min(3, indexed.length)).forEach((entry, rankIdx) => {
            map.set(entry.i, rankIdx + 1);
        });
        return map;
    }, [rows]);

    const showTitle = typeof title === 'string' && title.length > 0;

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '1920px',
                mx: 'auto',
                minHeight: 'min(1040px, 60vh)',
                px: { xs: 1, sm: 0 },
                overflow: 'visible',
                pt: 1,
                pb: 2,
            }}>
            <AnimatePresence mode="wait">
                <Box
                    key={questionIndex}
                    component={motion.div}
                    variants={DATAVIZ_LIST_CONTAINER}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        // gap: '120px',
                    }}>
                    {showTitle ? (
                        <Box
                            component={motion.div}
                            variants={DATAVIZ_ROW_ITEM}
                            sx={{ width: '100%', maxWidth: '100%', mb: '180px' }}>
                            <Typography
                                variant="h3"
                                component="h1"
                                sx={{
                                    textAlign: 'center',
                                    whiteSpace: 'pre-wrap',
                                    maxWidth: '100%',
                                    overflowWrap: 'anywhere',
                                    wordBreak: 'break-word',
                                }}>
                                {title}
                            </Typography>
                        </Box>
                    ) : null}

                    {rows.length > 0 ? (
                        rows.map((row, i) => (
                            <Box
                                key={`${i}-${row.text}`}
                                component={motion.div}
                                variants={DATAVIZ_ROW_ITEM}
                                sx={{
                                    position: 'relative',
                                    zIndex: rowStackZIndex(i, rows.length),
                                    width: '100%',
                                }}>
                                <DiscRow
                                    row={row}
                                    rowIndex={i}
                                    rowCount={rows.length}
                                    maxValue={maxValue}
                                    dataMin={dataMin}
                                    dataMax={dataMax}
                                    rank={topThreeRankByIndex.get(i)}
                                />
                            </Box>
                        ))
                    ) : (
                        <Box
                            component={motion.div}
                            variants={DATAVIZ_ROW_ITEM}
                            sx={{
                                width: '100%',
                                maxWidth: '1800px',
                                minHeight: showTitle ? undefined : 'min(1040px, 60vh)',
                                mx: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                px: 3,
                            }}>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ opacity: 0.7, fontSize: { xs: '27px', sm: '33px' } }}>
                                No response data yet.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </AnimatePresence>
        </Box>
    );
}
