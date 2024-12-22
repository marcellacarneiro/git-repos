export function setupMenuModal(menuToggleId, menuModalId, closeModalId) {
    const menuToggle = document.getElementById(menuToggleId);
    const menuModal = document.getElementById(menuModalId);
    const closeModal = document.getElementById(closeModalId);

    if (!menuToggle || !menuModal || !closeModal) {
        console.error('Menu Modal: Some elements were not found.');
        return;
    }

    menuToggle.addEventListener('click', () => {
        menuModal.classList.add('show');
    });

    closeModal.addEventListener('click', () => {
        menuModal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target === menuModal) {
            menuModal.classList.remove('show');
        }
    });
}
