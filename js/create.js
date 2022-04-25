const form = document.querySelector('form');


// creating the post method

const createPost = async (e) => {
  e.preventDefault();

  const doc = {
    content: form.content.value,
    isCompleted: form.ifCompleted.value
  }

  await fetch('http://localhost:3000/todos', {
    method: 'POST',
    body: JSON.stringify(doc),
    headers: { 'Content-Type': 'application/json' }
  })

  window.location.replace('/')
}

form.addEventListener('submit', createPost);