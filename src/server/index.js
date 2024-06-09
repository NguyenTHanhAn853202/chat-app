import { axiosConfig, get, post } from './config';

axiosConfig.interceptors.response.use(async (response) => {
    const url = response.config.url;
    if (url.includes('/user')) return response;

    const data = response.data;
    // if()
});

export { get, post };
