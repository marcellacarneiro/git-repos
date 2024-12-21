const menuToggle = document.getElementById('menuToggle');
const menuModal = document.getElementById('menuModal');
const closeModal = document.getElementById('closeModal');

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
