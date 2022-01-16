import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV();

export function setItemStorageMMKV(key, value) {
    try {
        storage.set(key, value)
        return true;
    } catch {
        return false;
    }
}

export function getItemStorageMMKV(key) {
    try {
        let value = storage.getString(key);
        return value;
    } catch {
        return false;
    }
}
