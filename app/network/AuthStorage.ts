import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_DATA_KEY = 'user_data';

export const saveAuthToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
        console.error('Error saving auth token:', error);
    }
};

export const getAuthToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

export const saveRefreshToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (error) {
        console.error('Error saving refresh token:', error);
    }
};

export const getRefreshToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
        console.error('Error getting refresh token:', error);
        return null;
    }
};

export const saveUserData = async (userData: any): Promise<void> => {
    try {
        await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

export const getUserData = async (): Promise<any | null> => {
    try {
        const userData = await AsyncStorage.getItem(USER_DATA_KEY);
        return userData ? JSON.parse(userData) : null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
};

export const clearAuthToken = async (): Promise<void> => {
    try {
        await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY]);
    } catch (error) {
        console.error('Error clearing auth data:', error);
    }
};