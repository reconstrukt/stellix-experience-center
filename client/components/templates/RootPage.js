import ScreenPage from '@/client/components/templates/ScreenPage';
import HomePage from '@/client/components/templates/HomePage';

function RootPage({ template, ...data }) {
    if (template === 'screen') return <ScreenPage {...data} />;
    else if (template === 'home') return <HomePage {...data} />;

    return 'unknown page';
}

export default RootPage;
