// javascript for details.html
const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.details');


const renderDetails =  async (e) => {

    const res =  await fetch('http://localhost:3000/todos/' + id);
    const post = await res.json();

    console.log(post);

    const template = ` 
        <h1>${post.content}</h1>
        <p> Completed : ${post.isCompleted}</p>
    `
    container.innerHTML = template; 
    // const item = e.target;
    // console.log(item.classList[0]);

    // const res = await fetch('http://localhost:3000/todos/' + id, { 
    //     method: 'DELETE'
    // });

    // window.location.replace('/');
};


window.addEventListener('DOMContentLoaded', renderDetails);