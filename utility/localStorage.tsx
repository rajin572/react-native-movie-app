import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageMode = 'array' | 'single';

// ─── SAVE ────────────────────────────────────────────────────────────────────

const saveData = async (
    key: string,
    value: any,
    mode: StorageMode = 'single'
): Promise<void> => {
    try {
        if (mode === 'array') {
            // Get the existing array (or start fresh)
            const existing = await AsyncStorage.getItem(key);
            const parsed: any[] = existing ? JSON.parse(existing) : [];

            // Avoid duplicates — if item has an id, check before pushing
            if (value?.id && parsed.some((item) => item.id === value.id)) {
                console.warn(`Item with id "${value.id}" already exists in "${key}"`);
                return;
            }

            parsed.push(value);
            await AsyncStorage.setItem(key, JSON.stringify(parsed));
        } else {
            // Single mode — just overwrite whatever was there
            await AsyncStorage.setItem(key, JSON.stringify(value));
        }

        console.log(`[storage] "${key}" saved (mode: ${mode})`);
    } catch (e) {
        console.error(`[storage] Failed to save "${key}"`, e);
    }
};

// ─── RETRIEVE ────────────────────────────────────────────────────────────────

const retrieveData = async <T = any>(key: string): Promise<T | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null ? (JSON.parse(value) as T) : null;
    } catch (e) {
        console.error(`[storage] Failed to retrieve "${key}"`, e);
        return null;
    }
};

// ─── REMOVE ──────────────────────────────────────────────────────────────────

type RemoveOptions =
    | { mode: 'key' }                        // wipe the whole key  (logout)
    | { mode: 'item'; id: string | number }; // remove one item from an array

const removeData = async (key: string, options: RemoveOptions): Promise<void> => {
    try {
        if (options.mode === 'key') {
            // Remove the entire key — good for logout / clearing single values
            await AsyncStorage.removeItem(key);
            console.log(`[storage] "${key}" removed`);
        } else {
            // Remove a specific item inside an array by its id
            const existing = await AsyncStorage.getItem(key);
            if (!existing) return;

            const parsed: any[] = JSON.parse(existing);
            const updated = parsed.filter((item) => item.id !== options.id);

            await AsyncStorage.setItem(key, JSON.stringify(updated));
            console.log(`[storage] item "${options.id}" removed from "${key}"`);
        }
    } catch (e) {
        console.error(`[storage] Failed to remove from "${key}"`, e);
    }
};

// ─── REMOVE MULTIPLE ITEMS FROM AN ARRAY ─────────────────────────────────────

const removeMultipleItems = async (
    key: string,
    ids: (string | number)[]
): Promise<void> => {
    try {
        const existing = await AsyncStorage.getItem(key);
        if (!existing) return;

        const parsed: any[] = JSON.parse(existing);
        const updated = parsed.filter((item) => !ids.includes(item.id));

        await AsyncStorage.setItem(key, JSON.stringify(updated));
        console.log(`[storage] items [${ids.join(', ')}] removed from "${key}"`);
    } catch (e) {
        console.error(`[storage] Failed to remove multiple items from "${key}"`, e);
    }
};

export { removeData, removeMultipleItems, retrieveData, saveData };

