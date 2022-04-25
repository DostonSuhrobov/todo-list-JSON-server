// javascript for details.html
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');


const renderDetails =  async (e) => {

    const res =  await fetch('http://localhost:3000/todos/' + id);
    const post = await res.json();

    console.log(post);

    const template = ` 
        <h1>${post.content}</h1>
        <p> Completed : ${post.isCompleted}</p>
    `
    container.innerHTML = template; 



};

deleteBtn.addEventListener('click', async (e) => {
    const res = await fetch('http://localhost:3000/todos/' + id, { 
        method: 'DELETE'
    });

    window.location.replace('/');
})

window.addEventListener('DOMContentLoaded', renderDetails);