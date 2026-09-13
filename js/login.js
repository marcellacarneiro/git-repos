import { login } from "./api.js";

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const data = await login(username, password);

        sessionStorage.setItem('token', data.token);

        window.location.href = './index.html';
    } catch (error) {
        alert(error.message);
    }
});
