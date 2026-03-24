function EntryPage({ entryId, data }) {
    // Through this page, you should determine the entry type, and then call the appropriate entry template
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default EntryPage;
