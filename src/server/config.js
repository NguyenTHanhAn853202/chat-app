import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:2805/api',
    timeout: 3000,
    headers: { 'Content-Type': 'application/json' },
});

const get = async (url, options) => {
    try {
        const data = await axiosConfig.get(url, options);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

const post = async (url, body, options) => {
    try {
        const data = await axiosConfig.post(url, { ...body }, options);
    } catch (error) {
        throw new Error(error.message);
    }
};

export { post, get, axiosConfig };
