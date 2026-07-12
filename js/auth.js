import { getUser } from './api.js';

const protectPage = async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
        window.location.href = './login.html';
        return;
    }

    try {
        await getUser();
    } catch (error) {
        sessionStorage.removeItem('token');
        window.location.href = './login.html';
    }
};

protectPage();