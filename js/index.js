// javascript for index.html
const container = document.querySelector('.blogs');


const renderPosts = async () => {
    let uri = 'http://localhost:3000/todos';

    const res = await fetch(uri);
    const posts = await res.json();
    console.log(posts);

    let template = '';

    posts.forEach(post => {
        template += `
            <div class="post">
                <h2>${post.content}</h2>
                <p>Compleated : ${post.isCompleted}</p>
                <a href="/details.html?id=${post.id}">read more...</a>
                <button class='delete'>delete</button>
            </div>
        `
    });
    container.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderPosts());