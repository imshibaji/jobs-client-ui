// store.ts
import { atom } from "nanostores";

export const $store = atom<any>();

export const setStore = (value: any) => {
    $store.set(value);
};

export const getStore = () => {
    return $store.get();
};

export const resetStore = () => {
    $store.set(null);
};