import { setupMenuModal } from './modal.js';

setupMenuModal('menuToggle', 'menuModal', 'closeModal');

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

    try {
        const repoData = new FormData();
        repoData.append('name', name);
        repoData.append('description', description);
        repoData.append('languages', languages);
        repoData.append('figmaUrl', figmaUrl);
        repoData.append('githubUrl', githubUrl);
        repoData.append('deployUrl', deployUrl);
        repoData.append('image', image);
        repoData.append('demo', demo);

        const response = await fetch('http://localhost:3001/api/repos/create', {
            method: 'POST',
            body: repoData,
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('registration-form').reset();
            const imagePreview = document.getElementById('image-preview');
            const demoPreview = document.getElementById('demo-preview');
            imagePreview.style.display = 'none';
            imagePreview.src = '';
            demoPreview.style.display = 'none';
            demoPreview.src = '';
            document.getElementById('clearImage').style.display = 'none';
        }
    } catch (e) {
        console.error(e);
    }
});

document.getElementById('image').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const imagePreview = document.getElementById('image-preview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            document.getElementById('clear-image').style.visibility = 'visible';
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('demo').addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const demoPreview = document.getElementById('demo-preview');
            demoPreview.src = e.target.result;
            demoPreview.style.display = 'block';
            document.getElementById('clear-demo').style.visibility = 'visible';
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('clear-image').addEventListener('click', function () {
    document.getElementById('image').value = '';

    const imagePreview = document.getElementById('image-preview');
    imagePreview.style.display = 'none';
    imagePreview.src = '';

    document.getElementById('clear-image').style.visibility = 'hidden';
});

document.getElementById('clear-demo').addEventListener('click', function () {
    document.getElementById('demo').value = '';

    const demoPreview = document.getElementById('demo-preview');
    demoPreview.style.display = 'none';
    demoPreview.src = '';

    document.getElementById('clear-demo').style.visibility = 'hidden';
});
