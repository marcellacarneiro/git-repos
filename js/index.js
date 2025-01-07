import { setupMenuModal } from './modal.js';
import { getRepos } from './api.js';

setupMenuModal('menuToggle', 'menuModal', 'closeModal');

document.addEventListener('DOMContentLoaded', async () => {
    const reposContainer = document.getElementById('repos-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageNumbersContainer = document.getElementById('page-numbers');

    let currentPage = 1;
    const limit = 9;
    let totalPages = 1;

    const loadRepos = async (page) => {
        try {
            const offset = (page - 1) * limit;
            const data = await getRepos(offset, limit);

            totalPages = data.totalPages;

            reposContainer.innerHTML = '';

            if (data.data.length > 0) {
                for (const repo of data.data) {
                    const div = document.createElement('div');
                    div.classList.add('repo');

                    const formattedDate = new Date(repo.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    });

                    div.innerHTML = `
                        <div class="repo__infos">
                            <a href="edit-repo.html?id=${repo._id}">
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
            }

            updatePagination(data.currentPage, totalPages);
        } catch (e) {
            console.error('Erro ao carregar os repositórios:', e);
        }
    };

    const updatePagination = (currentPage, totalPages) => {
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;

        pageNumbersContainer.textContent = `${currentPage} de ${totalPages}`;
    };

    const changePage = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (direction === 'next' && currentPage < totalPages) {
            currentPage++;
        }
        loadRepos(currentPage);
    };

    prevPageButton.addEventListener('click', () => changePage('prev'));
    nextPageButton.addEventListener('click', () => changePage('next'));

    loadRepos(currentPage);
});
