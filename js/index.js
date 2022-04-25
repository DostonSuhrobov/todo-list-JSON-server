// javascript for index.html
const container = document.querySelector('.blogs');


const renderTodos = async () => {
    let uri = 'http://localhost:3000/todos';

    const res = await fetch(uri);
    const todos = await res.json();
    console.log(todos);

    let template = '';

    todos.forEach(todo => {
        template += `
            <div class="post">
                <h2>${todo.content}</h2>
                <p>Compleated : ${todo.isCompleted}</p>
                <a href="/details.html?id=${todo.id}">click here to delete</a>
                
            </div>
        `
    });
    container.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderTodos());