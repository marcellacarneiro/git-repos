import { setupMenuModal } from './modal.js';

setupMenuModal('menuToggle', 'menuModal', 'closeModal');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3001/api/repos');
        const repos = await response.json();

        const reposContainer = document.getElementById('repos-container');

        for (const repo of repos.data) {
            const div = document.createElement('div');
            div.classList.add('repo');

            const formattedDate = new Date(repo.date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });

            div.innerHTML = `
                <div class="repo__infos">
                    <a href="">
                        <h3>${repo.name}</h3>
                    </a>
                    <p>${repo.description}</p>
                </div>
                <span class="repo__date">
                    ${formattedDate}
                </span>
            `;

            reposContainer.appendChild(div);
        }
    } catch (e) {
        console.error(e);
    }
});
