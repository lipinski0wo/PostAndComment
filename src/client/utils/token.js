import jwt_decode from 'jwt-decode';
import { removeAxiosAuthorization, setAxiosAuthorization } from './axios';

export const getInitialState = () => {
    const token = localStorage.getItem('dingUserToken');
    if (!token) return {};

    const data = jwt_decode(token);
    if (!(data.id || data.iat || data.exp || data.username || data.email || data.avatar)) {
        return {};
    }
    if (data.exp < Date.now() / 1000) {
        removeAxiosAuthorization();
        return {};
    }
    setAxiosAuthorization(token);

    return {
        user: {
            isAuthorized: true,
            userData: {
                token,
                exp: data.exp,
                iat: data.iat,
                username: data.username,
                email: data.email,
                avatar: data.avatar,
                id: data.id
            },
            login: {
                errors: {},
                inputs: {
                    email: '',
                    password: ''
                }
            },
            register: {
                errors: {},
                inputs: {
                    username: '',
                    email: '',
                    password1: '',
                    password2: ''
                },
                success: false
            },
        }
    };
};

export const getUserDataFromToken = token => {
    const { exp, iat, username, email, avatar, id } = jwt_decode(token);
    return {
        token,
        exp,
        iat,
        username,
        email,
        avatar,
        id
    };
};

export const applyTokenApp = token => {
    localStorage.setItem('dingUserToken', token);
    setAxiosAuthorization(token);
};

export const removeTokenFromApp = () => {
    localStorage.removeItem('dingUserToken');
    removeAxiosAuthorization();
};