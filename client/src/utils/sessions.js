export const setToken = (token) => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem('token', token);
    }
};

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return sessionStorage.getItem('token');
    }
};

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('token');
    }
};
