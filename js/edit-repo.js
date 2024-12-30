import { setupMenuModal } from './modal.js';
import { showImagePreview, showDemoPreview, clearImagePreview, clearDemoPreview } from './previews.js';

setupMenuModal('menuToggle', 'menuModal', 'closeModal');
showImagePreview();
showDemoPreview();
clearImagePreview();
clearDemoPreview();

document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    try {
        const response = await fetch(`http://localhost:3001/api/repos/${id}`);
        const result = await response.json();

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
        const response = await fetch(`http://localhost:3001/api/repos/update/${id}`, {
            method: 'PUT',
            body: repoData,
        });

        const updatedRepo = await response.json();

        if (response.ok) {
            alert('Repositório atualizado com sucesso!');
            window.location.href = `./index.html`;
        } else {
            alert(`Erro ao atualizar repositório: ${updatedRepo.message || 'Erro desconhecido'}`);
        }
    } catch (e) {
        console.error(e);
    }
});
