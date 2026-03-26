import React, { useEffect, useMemo, useState } from 'react';

function toMinutesSinceMidnight({ hour, minute, meridiem }) {
    let h = hour % 12;
    if (meridiem === 'PM') h += 12;
    return h * 60 + minute;
}

function parseClockTime(part) {
    const m = String(part)
        .trim()
        .match(/^(?<h>\d{1,2})(?::(?<m>\d{2}))?\s*(?<ampm>AM|PM)?$/i);
    if (!m?.groups?.h) return null;
    const hour = Number(m.groups.h);
    const minute = Number(m.groups.m ?? '0');
    const meridiem = (m.groups.ampm ?? '').toUpperCase();
    if (!Number.isFinite(hour) || !Number.isFinite(minute) || minute > 59) return null;
    if (hour < 1 || hour > 12) return null;
    if (meridiem && meridiem !== 'AM' && meridiem !== 'PM') return null;
    return { hour, minute, meridiem: meridiem || null };
}

function parseTimeslotRange(timeslot) {
    // Accept hyphen/en-dash/em-dash between times (e.g. "12:00 – 12:50 PM")
    const parts = String(timeslot)
        .split(/\s*[–—-]\s*/)
        .map(p => p.trim())
        .filter(Boolean);
    if (parts.length < 2) return null;

    const startRaw = parseClockTime(parts[0]);
    const endRaw = parseClockTime(parts[1]);
    if (!startRaw || !endRaw) return null;

    const inferredMeridiem = startRaw.meridiem ?? endRaw.meridiem ?? null;
    if (!inferredMeridiem) return null;

    const start = {
        ...startRaw,
        meridiem: startRaw.meridiem ?? inferredMeridiem,
    };
    const end = {
        ...endRaw,
        meridiem: endRaw.meridiem ?? inferredMeridiem,
    };

    const startMin = toMinutesSinceMidnight(start);
    const endMin = toMinutesSinceMidnight(end);
    return { startMin, endMin };
}

export default function useActiveAgendaIndex(agendaItems, { pollMs = 30_000 } = {}) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), pollMs);
        return () => clearInterval(id);
    }, [pollMs]);

    const nowMinutes = useMemo(() => now.getHours() * 60 + now.getMinutes(), [now]);

    return useMemo(() => {
        for (let idx = 0; idx < agendaItems.length; idx += 1) {
            const range = parseTimeslotRange(agendaItems[idx]?.timeslot);
            if (!range) continue;
            const { startMin, endMin } = range;
            if (nowMinutes >= startMin && nowMinutes < endMin) return idx;
        }
        return -1;
    }, [agendaItems, nowMinutes]);
}
