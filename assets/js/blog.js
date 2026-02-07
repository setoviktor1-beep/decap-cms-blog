document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/posts.json');
    const posts = await response.json();
    const container = document.getElementById('posts-container');
    const searchInput = document.getElementById('search');

    function render(filter = '') {
        container.innerHTML = posts
            .filter(p => p.title.toLowerCase().includes(filter.toLowerCase()))
            .map(p => `
                <article class="post-card">
                    <a href="${p.url}">
                        <div class="meta">
                            <span class="badge">${p.category}</span>
                            <span>${new Date(p.date).toLocaleDateString()}</span>
                        </div>
                        <h2>${p.title}</h2>
                        <p>${p.description}</p>
                    </a>
                </article>
            `).join('');
    }

    searchInput.addEventListener('input', (e) => render(e.target.value));
    render();
});
