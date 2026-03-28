import PersistentStorageService from '@/client/services/PersistentStorageService';

function getPersistentState(key) {
    console.log(key, PersistentStorageService.get(`state_${key}`) || '');
    return PersistentStorageService.get(`state_${key}`) || '';
}

export const storeDefinition = {
    contentVersion: {
        persistent: false,
        default: 0,
    },
    content: {
        persistent: false,
        default: {
            isLoading: true,
            data: {},
        },
    },
};

export const storeDefaults = Object.keys(storeDefinition).reduce((acc, key) => {
    acc[key] = storeDefinition[key].persistent ? getPersistentState(key) : storeDefinition[key].default;
    return acc;
}, {});
