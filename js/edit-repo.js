import { setupMenuModal } from './modal.js';
import { showImagePreview, showDemoPreview, clearImagePreview, clearDemoPreview } from './previews.js';
import { deleteRepo, getRepoById, updateRepo } from './api.js';

setupMenuModal('menuToggle', 'menuModal', 'closeModal');
showImagePreview();
showDemoPreview();
clearImagePreview();
clearDemoPreview();

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    try {
        const result = await getRepoById(id);

        document.getElementById('name').value = result.name;
        document.getElementById('description').value = result.description;
        document.getElementById('languages').value = result.languages.join(', ');
        document.getElementById('figmaUrl').value = result.figmaUrl || '';
        document.getElementById('githubUrl').value = result.githubUrl || '';
        document.getElementById('deployUrl').value = result.deployUrl || '';

        const imagePreview = document.getElementById('image-preview');
        const demoPreview = document.getElementById('demo-preview');

        if (result.image && result.image.data && result.image.data.data) {
            const blob = new Blob([new Uint8Array(result.image.data.data)], { type: `${result.image.contentType}` });
            const url = URL.createObjectURL(blob);

            imagePreview.src = url;
            imagePreview.style.display = 'block';
            document.getElementById('clear-image').style.visibility = 'visible';
        } else {
            imagePreview.style.display = 'none';
        }

        if (result.demo && result.demo.data && result.demo.data.data) {
            const blob = new Blob([new Uint8Array(result.demo.data.data)], { type: `${result.demo.contentType}` });
            const url = URL.createObjectURL(blob);

            demoPreview.src = url;
            demoPreview.style.display = 'block';
            document.getElementById('clear-demo').style.visibility = 'visible';
        } else {
            demoPreview.style.display = 'none';
        }
    } catch (e) {
        console.error(e);
    }
});

document.getElementById('update-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const languages = document.getElementById('languages').value;
    const figmaUrl = document.getElementById('figmaUrl').value;
    const githubUrl = document.getElementById('githubUrl').value;
    const deployUrl = document.getElementById('deployUrl').value;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const repoData = new FormData();
    repoData.append('name', name);
    repoData.append('description', description);
    repoData.append('languages', languages);
    repoData.append('figmaUrl', figmaUrl);
    repoData.append('githubUrl', githubUrl);
    repoData.append('deployUrl', deployUrl);

    const image = document.getElementById('image');
    if (image.files.length > 0) {
        repoData.append('image', image.files[0]);
    }

    const demo = document.getElementById('demo');
    if (demo.files.length > 0) {
        repoData.append('demo', demo.files[0]);
    }

    try {
        await updateRepo(id, repoData);
        window.location.assign('./index.html');
    } catch (e) {
        console.error(e);
    }
});

document.getElementById('delete-button').addEventListener('click', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    try {
        const ok = confirm("Tem certeza de que deseja deletar este repositório?");
        if(ok){
            await deleteRepo(id);
            window.location.href = `./index.html`;
        }
    } catch (error) {
        console.error(error);
    }
});

document.getElementById('cancel-button').addEventListener('click', function () {
    window.location.assign('./index.html');
});
