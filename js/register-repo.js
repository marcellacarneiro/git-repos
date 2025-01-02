import { createRepo } from './api.js';
import { setupMenuModal } from './modal.js';
import { showImagePreview, showDemoPreview, clearImagePreview, clearDemoPreview } from './previews.js';

setupMenuModal('menuToggle', 'menuModal', 'closeModal');
showImagePreview();
showDemoPreview();
clearImagePreview();
clearDemoPreview();

document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const languages = document.getElementById('languages').value;
    const figmaUrl = document.getElementById('figmaUrl').value;
    const githubUrl = document.getElementById('githubUrl').value;
    const deployUrl = document.getElementById('deployUrl').value;
    const image = document.getElementById('image').files[0];
    const demo = document.getElementById('demo').files[0];

    const repoData = new FormData();
    repoData.append('name', name);
    repoData.append('description', description);
    repoData.append('languages', languages);
    repoData.append('figmaUrl', figmaUrl);
    repoData.append('githubUrl', githubUrl);
    repoData.append('deployUrl', deployUrl);
    repoData.append('image', image);
    repoData.append('demo', demo);

    try {
        await createRepo(repoData);
        window.location.assign('./index.html');
    } catch (e) {
        console.error(e);
    }
});

document.getElementById('cancel-button').addEventListener('click', function () {
    window.location.assign('./index.html');
});
