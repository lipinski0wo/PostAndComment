import axios from 'axios';

export const setAxiosAuthorization = token => {
    axios.defaults.headers.common['Authorization'] = `${token}`;
};

export const removeAxiosAuthorization = () => {
    delete axios.defaults.headers.common['Authorization'];
};