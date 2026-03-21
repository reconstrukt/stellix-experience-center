class PersistentStorageService {
    constructor() {
        if (typeof window === 'undefined') return;
        try {
            this.storage = window.localStorage;
            this.tempStorage = window.sessionStorage;
        } catch (e) {
            console.log('[PersistentStorage] LS error', e);
            this.storage = this.mockStorage();
        }

        this.state = this.getAll();
        this.persistentStateKey = 'stx';
    }

    mockStorage() {
        if (!window.mockStorage) window.mockStorage = {};
        return {
            setItem(key, val) {
                window.mockStorage[key] = val;
            },
            removeItem(key) {
                delete window.mockStorage[key];
            },
            getItem(key) {
                return window.mockStorage[key];
            },
        };
    }

    setTemp(key, value) {
        try {
            this.tempStorage.setItem(key, this.maybeJSONStringify(value));
        } catch (e) {
            //
        }
    }

    getTemp(key) {
        try {
            return this.maybeParseJSON(this.tempStorage.getItem(key));
        } catch (e) {
            //
        }
    }

    deleteTemp(key) {
        this.tempStorage.removeItem(key);
    }

    set(key, value) {
        const thisKey = `${this.persistentStateKey}_${key}`;
        this.state[thisKey] = value;
        this.storage.setItem(thisKey, this.maybeJSONStringify(value));
    }

    delete(key) {
        const thisKey = `${this.persistentStateKey}_${key}`;
        delete this.state[thisKey];
        this.storage.removeItem(thisKey);
    }

    get(key) {
        const thisKey = `${this.persistentStateKey}_${key}`;
        if (!this.state) return;
        return this.maybeParseJSON(this.state[thisKey]);
    }

    setPersistentState(key, val) {
        const currentState = this.getPersistentState();
        currentState[key] = val;
        this.set(this.persistentStateKey, currentState);
    }

    getPersistentState() {
        return this.get(this.persistentStateKey) || {};
    }

    getAll() {
        const values = {};
        const keys = Object.keys(this.storage);
        let i = keys.length;

        while (i--) {
            values[keys[i]] = this.maybeParseJSON(this.storage.getItem(keys[i]));
        }

        return values;
    }

    maybeParseJSON(val) {
        if (!val || !val.startsWith) return val;
        if (!val.startsWith('{') && !val.startsWith('[')) return val;
        try {
            val = JSON.parse(val);
        } catch (e) {
            // not JSON
        }
        return val;
    }

    maybeJSONStringify(val) {
        if (!Array.isArray(val) && typeof val !== 'object') return val;
        try {
            val = JSON.stringify(val);
        } catch (e) {
            // not JSON
        }
        return val;
    }
}

export default new PersistentStorageService();
