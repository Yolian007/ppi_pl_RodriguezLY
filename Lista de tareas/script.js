// Define la función addTask para añadir nuevas tareas a la lista
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    if (taskInput.value.trim() !== '') {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      // Asigna el evento click al checkbox para cambiar el estado de la tarea
      checkbox.onclick = () => toggleTask(checkbox, li);
      li.appendChild(checkbox);
  
      const taskText = document.createElement('span');
      taskText.textContent = taskInput.value;
      li.appendChild(taskText);
  
      const deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'Eliminar';
      // Función de flecha simplificada para eliminar la tarea
      deleteBtn.onclick = () => li.remove();
      li.appendChild(deleteBtn);
  
      taskList.appendChild(li);
      taskInput.value = '';
    }
  }
  
  // Define la función toggleTask para alternar la clase 'completed'
  function toggleTask(checkbox, taskItem) {
    if (checkbox.checked) {
      taskItem.classList.add('completed');
    } else {
      taskItem.classList.remove('completed');
    }
  }
  
  // Event listener para añadir una tarea cuando se presiona 'Enter'
  document.getElementById('taskInput').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  
