'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import PersistentStorageService from '@/client/services/PersistentStorageService';
import { storeDefaults, storeDefinition } from '@/client/store/store';

/**
 * React context for the store provider
 * @type {React.Context}
 */
const StoreContext = createContext();

/**
 * Logs an error when a store key is not defined in the store definition
 * @param {string} keyName - The name of the undefined key
 */
const logKeyNotDefinedError = keyName => {
    console.log(`Key ${keyName} not defined in store`);
};

/**
 * Logs an error when a store key is not defined as persistent
 * @param {string} keyName - The name of the non-persistent key
 */
const logKeyNotPersistentError = keyName => {
    console.error(`Key ${keyName} not defined as persistent in store`);
};

/**
 * StoreProvider component that provides state management context to child components.
 * Supports both regular state and persistent state that survives browser sessions.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - Child components that will have access to the store
 * @param {Object} [props.initValues={}] - Initial values to override store defaults
 * @returns {React.ReactElement} The provider component wrapping children with store context
 */
function StoreProvider({ children, initValues = {} }) {
    const getInitialStore = () => {
        return { ...storeDefaults, ...initValues };
    };

    const [internalStore, setInternalStore] = useState(getInitialStore);

    // Refs to store stable setter functions per key
    const settersRef = useRef({});
    const persistentSettersRef = useRef({});

    /**
     * Hook to get and set a non-persistent store value
     * @param {string} keyName - The key name in the store definition
     * @returns {[any, Function]} A tuple containing the current value and setter function
     */
    const useValue = useCallback(
        keyName => {
            if (!storeDefinition[keyName]) {
                logKeyNotDefinedError(keyName);
            }

            // Create and memoize setter for this key
            if (!settersRef.current[keyName]) {
                settersRef.current[keyName] = newValue =>
                    setInternalStore(v => ({
                        ...v,
                        [keyName]: typeof newValue === 'function' ? newValue(v[keyName]) : newValue,
                    }));
            }

            return [internalStore[keyName], settersRef.current[keyName]];
        },
        [internalStore],
    );

    /**
     * Hook to get and set a persistent store value that survives browser sessions
     * @param {string} keyName - The key name in the store definition (must be marked as persistent)
     * @returns {[any, Function]} A tuple containing the current value and persistent setter function
     */
    const usePersistentValue = useCallback(
        keyName => {
            if (!storeDefinition[keyName]) {
                logKeyNotDefinedError(keyName);
            }
            if (!storeDefinition[keyName].persistent) {
                logKeyNotPersistentError(keyName);
            }

            // Create and memoize persistent setter for this key
            if (!persistentSettersRef.current[keyName]) {
                persistentSettersRef.current[keyName] = newValue => {
                    setInternalStore(prev => {
                        const updatedValue = typeof newValue === 'function' ? newValue(prev[keyName]) : newValue;
                        PersistentStorageService.set(`state_${keyName}`, updatedValue);
                        return {
                            ...prev,
                            [keyName]: updatedValue,
                        };
                    });
                };
            }

            return [internalStore[keyName], persistentSettersRef.current[keyName]];
        },
        [internalStore],
    );

    const contextValue = useMemo(
        () => ({
            useValue,
            usePersistentValue,
        }),
        [useValue, usePersistentValue],
    );

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
}

/**
 * Custom hook to access the store context
 * @returns {Object} Store context containing useValue and usePersistentValue methods
 * @returns {Function} returns.useValue - Hook for non-persistent store values
 * @returns {Function} returns.usePersistentValue - Hook for persistent store values
 */
export const useStore = () => {
    return useContext(StoreContext);
};

export default StoreProvider;
