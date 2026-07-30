import { getUser } from './api.js';

export async function setupEditMode() {
    const fields = document.querySelectorAll('input, textarea, button.custom-file-input, #clear-image, #clear-demo');

    const buttons = document.querySelectorAll('#submit-button, #delete-button');

    try {
        await getUser();

        fields.forEach((field) => {
            field.disabled = false;
        });

        buttons.forEach((button) => {
            button.classList.remove('hidden');
        });
    } catch {}
}
