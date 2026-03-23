import RootPage from '@/client/components/templates/RootPage';

export const metadata = {
    title: 'Stellix Experience',
};

export default async function Page({ params }) {
    const { screenNumber } = await params;
    return (
        <RootPage
            template="screen"
            screenNumber={screenNumber}
        />
    );
}
