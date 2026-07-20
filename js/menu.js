import { getUser } from './api.js';

export async function setupMenu() {
    console.log('setupMenu iniciou');
    const menusLoggedIn = document.querySelectorAll('.menu-logged-in');
    const menusLoggedOff = document.querySelectorAll('.menu-logged-off');

    try {
        const user = await getUser();
        console.log('Usuário:', user);

        menusLoggedIn.forEach((menu) => {
            menu.classList.remove('hidden');
        });

        menusLoggedOff.forEach((menu) => {
            menu.classList.add('hidden');
        });
    } catch (e) {
        console.error(e);
        menusLoggedIn.forEach((menu) => {
            menu.classList.add('hidden');
        });

        menusLoggedOff.forEach((menu) => {
            menu.classList.remove('hidden');
        });
    }
}
