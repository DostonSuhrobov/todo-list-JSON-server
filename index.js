
document.addEventListener('DOMContentLoaded', function() {

  const todoContainer = document.querySelector('#todo-container') 
  const todoForm = document.querySelector('#todo-form') 
  
  const todoURL = `http://localhost:3000/todos`
  let alltodos = [] 
  
// fetch
  fetch(`${todoURL}`)
    .then( response => response.json() ) 
    .then( todoData => todoData.forEach(function(todo) {
      alltodos = todoData  
      todoContainer.innerHTML += `
      <div id=todo-${todo.id}>
        <h2>${todo.content}</h2>
        <button data-id=${todo.id} id="edit-${todo.id}" data-action="edit">Edit</button>
        <button data-id=${todo.id} id="delete-${todo.id}" data-action="delete">Delete</button>
      </div>
      <div id=edit-todo-${todo.id}>
      </div>`
    })) 


   // create
   todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

  
    const contentInput = todoForm.querySelector('#content').value
    const isCompleted_input = todoForm.querySelector('#isCompleated').value


    fetch(`${todoURL}`, {
      method: 'POST',
      body: JSON.stringify({
        content: contentInput,
        isCompleted: isCompleted_input
      }),
      
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( response => response.json())
      .then( todo => {
        alltodos.push(todo)
        todoContainer.innerHTML += `
        <div id=todo-${todo.id}>
          <h2>${todo.content}</h2>
          <button data-id=${todo.id} id="edit-${todo.id}" data-action="edit">Edit</button>
          <button data-id=${todo.id} id="delete-${todo.id}" data-action="delete">Delete</button>
        </div>
        <div id=edit-todo-${todo.id}>
        </div>`
      })

  })

  todoContainer.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'edit') {

      const editButton = document.querySelector(`#edit-${e.target.dataset.id}`)
      editButton.disabled = true

      const todoData = alltodos.find((todo) => {
        return todo.id == e.target.dataset.id
      })

      const editForm = todoContainer.querySelector(`#edit-todo-${e.target.dataset.id}`)
      editForm.innerHTML = `
        <form class='form' id='edit-todo' action='index.html' method='post'>
          <form id="todo-form">
            <input required id="edit-content" placeholder="${todoData.content}">
            <input required id="edit-isCompleated" placeholder="${todoData.isCompleted}">
            <input type="submit" value="Edit todo">
        </form>`

        editForm.addEventListener("submit", (e) => {
          event.preventDefault()

          const content_input = document.querySelector("#edit-content").value
          const isCompleted_input = document.querySelector("#edit-isCompleated").value
          const editedtodo = document.querySelector(`#todo-${todoData.id}`)

          fetch(`${todoURL}/${todoData.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              content: content_input,
              isCompleted: isCompleted_input,

            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then( response => response.json() )
          .then( todo => {
            editedtodo.innerHTML = `
            <div id=todo-${todo.id}>
              <h2>${todo.content}</h2>
              <h4>isCompleated: ${todo.isCompleted}</h4>

              <button data-id=${todo.id} id="edit-${todo.id}" data-action="edit">Edit</button>
              <button data-id=${todo.id} id="delete-${todo.id}" data-action="delete">Delete</button>
            </div>
            <div id=edit-todo-${todo.id}>
            </div>`
            editForm.innerHTML = ""
          })
      })

              
    } else if (e.target.dataset.action === 'delete') {
      document.querySelector(`#todo-${e.target.dataset.id}`).remove()
        fetch(`${todoURL}/${e.target.dataset.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( response => response.json())
      }

  }) 

})
