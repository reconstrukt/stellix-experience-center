'use client';

import { Box, Typography } from '@mui/material';
import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react';

const ROW_HEIGHT = 52;
const LINE_GAP = 8;

const MIN_RX_FRAC = 0.07;
const MAX_RX_FRAC = 0.42;

const DISC_FILLS = ['#E0B03C', '#92C83E', '#33B2C1', '#3B4752'];

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

function DiscRow({ row, rowIndex, rowCount, maxValue, dataMin, dataMax }) {
    const rowRef = useRef(null);
    const textRef = useRef(null);
    const filterId = `dvz-glow-${useId().replace(/:/g, '')}`;
    const [rowW, setRowW] = useState(0);
    const [rowH, setRowH] = useState(ROW_HEIGHT);
    const [lineStartX, setLineStartX] = useState(0);
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
            // Same origin as position:absolute; left:0; top:0 — padding edge of the row
            const rightOfText = textRect.right - rowRect.left - bl;
            const startX = rightOfText + LINE_GAP;
            const centerY = textRect.top + textRect.height / 2 - rowRect.top - bt;

            setRowW(rowEl.clientWidth || rowRect.width);
            setRowH(Math.max(ROW_HEIGHT, rowEl.offsetHeight));
            setLineStartX(Number.isFinite(startX) ? startX : 0);
            setTextCenterY(Number.isFinite(centerY) ? centerY : rowEl.clientHeight / 2);
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(rowEl);
        ro.observe(textEl);
        return () => ro.disconnect();
    }, [row.text]);

    const safeW = Math.max(rowW, 1);
    const safeH = Math.max(rowH, ROW_HEIGHT);
    const cx = safeW / 2;
    const v = Number(row.value);
    const rx = safeW * (MIN_RX_FRAC + (v / maxValue) * (MAX_RX_FRAC - MIN_RX_FRAC));
    const ry = discRy(rowIndex, rowCount, ROW_HEIGHT);
    const textY = Math.min(Math.max(0, textCenterY), safeH);
    const fill = DISC_FILLS[valueQuartileColorIndex(v, dataMin, dataMax)];
    const dotR = 3;

    const lineEnd = cx - rx;
    const lineStart = Math.min(lineStartX, lineEnd - 0.5);
    const showLine = lineStart < lineEnd;

    const discW = 2 * rx;
    const discH = 2 * ry;

    const stackZ = rowStackZIndex(rowIndex, rowCount);

    return (
        <Box
            ref={rowRef}
            sx={{
                position: 'relative',
                width: '100%',
                minHeight: ROW_HEIGHT,
                py: 0.5,
                overflow: 'visible',
                zIndex: stackZ,
            }}>
            <Typography
                ref={textRef}
                variant="body1"
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'inline-block',
                    verticalAlign: 'top',
                    maxWidth: { xs: '46%', sm: '48%' },
                    pr: 1,
                    textAlign: 'left',
                    fontSize: { xs: '13.5px', sm: '16.5px' },
                    lineHeight: 1.25,
                }}>
                {row.text}
            </Typography>

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
                    zIndex: 1,
                }}
                viewBox={`0 0 ${safeW} ${safeH}`}
                preserveAspectRatio="none">
                {showLine ? (
                    <line
                        x1={lineStart}
                        y1={textY}
                        x2={lineEnd}
                        y2={textY}
                        stroke="rgba(255,255,255,0.45)"
                        strokeWidth={2}
                        strokeDasharray="4 14"
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
                                stdDeviation="1.2"
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
                        strokeWidth={1}
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

export default function DatavizStub({ data }) {
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

    if (rows.length === 0) {
        return (
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '900px',
                    minHeight: 'min(520px, 60vh)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 3,
                }}>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ opacity: 0.7, fontSize: { xs: '13.5px', sm: '16.5px' } }}>
                    No response data yet.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '960px',
                mx: 'auto',
                minHeight: 'min(520px, 60vh)',
                px: { xs: 1, sm: 0 },
                overflow: 'visible',
                pt: 1,
                pb: 2,
            }}>
            {rows.map((row, i) => (
                <DiscRow
                    key={`${row.text}-${i}`}
                    row={row}
                    rowIndex={i}
                    rowCount={rows.length}
                    maxValue={maxValue}
                    dataMin={dataMin}
                    dataMax={dataMax}
                />
            ))}
        </Box>
    );
}
