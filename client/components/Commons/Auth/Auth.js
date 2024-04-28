"use client";
import { deleteLocalStorage, getLocalStorage, getLocalStorages } from "./LocalStorage";


export const setAuthentication = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
}

export const isAuthenticated = () => {
    if (typeof window !== "undefined") {
        if (getLocalStorages('user') && getLocalStorage('token')) {
            return getLocalStorages('user');
        } else {
            return false;
        }
    }
}

export const logout = (next) => {
    if (typeof window !== "undefined") {
        deleteLocalStorage('user');
        deleteLocalStorage('token');
        // next();
    }
}