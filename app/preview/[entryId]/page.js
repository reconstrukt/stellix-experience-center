import ContentfulService from '@/client/services/ContentfulService';
import { notFound, redirect } from 'next/navigation';

export const metadata = {
    title: 'Stellix Experience',
};

const getData = async entryId => {
    return await ContentfulService.getEntryById(entryId);
};

export default async function Page({ params }) {
    const { entryId } = await params;
    const data = await getData(entryId);
    if (!data) notFound();
    redirect(`/entry/${entryId}`);
    return null;
}
