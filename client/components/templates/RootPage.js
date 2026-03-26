'use client';

import Background from '@/client/components/common/Background';
import ScreenPage from '@/client/components/templates/ScreenPage';
import HomePage from '@/client/components/templates/HomePage';
import EntryPage from '@/client/components/templates/EntryPage';

function RootPage({ template, ...data }) {
    let content = 'unknown page';
    if (template === 'screen') content = <ScreenPage {...data} />;
    else if (template === 'home') content = <HomePage {...data} />;
    else if (template === 'entry') content = <EntryPage {...data} />;

    return <Background>{content}</Background>;
}

export default RootPage;
