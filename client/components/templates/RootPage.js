import ScreenPage from '@/client/components/templates/ScreenPage';
import HomePage from '@/client/components/templates/HomePage';
import EntryPage from '@/client/components/templates/EntryPage';

function RootPage({ template, ...data }) {
    if (template === 'screen') return <ScreenPage {...data} />;
    else if (template === 'home') return <HomePage {...data} />;
    else if (template === 'entry') return <EntryPage {...data} />;

    return 'unknown page';
}

export default RootPage;
