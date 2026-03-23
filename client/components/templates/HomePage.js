import { Stack } from '@mui/material';
import Link from 'next/link';

const screens = [1, 2, 3];

export default function HomePage() {
    return (
        <Stack spacing={2}>
            {screens.map(s => (
                <Link
                    key={s}
                    href={`/screen/${s}`}>
                    Screen {s}
                </Link>
            ))}
        </Stack>
    );
}
