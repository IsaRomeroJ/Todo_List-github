let newTask = document.getElementById('input-newtask');
const btnNewTask = document.getElementById('btn-newtask');
let taskList = [
  { id: 1, taskName: 'Hacer mercado', estado: true },
  { id: 2, taskName: 'Estudiar pata la prueba', estado: true },
  { id: 3, taskName: 'Sacar a pasear a Tobby', estado: false },
];


const renderizarTaskList = (taskList) => {
  let html = '';

  taskList.forEach((task) => {

    const statusBtnIcon = task.estado ? 'bi-clipboard-check-fill' : 'bi-clipboard-fill';
    html += `<tr>
                <td>${task.id}</td>
                <td>${task.taskName}</td>
                <td><i class="${statusBtnIcon}" onclick="changeStatusTask(${task.id})"></i></td>
                <td><i class="bi bi-trash-fill" onclick="deleteTask(${task.id})"></i></td>
            </tr>`;
  });

  document.getElementById('task-list').innerHTML = html;
  document.getElementById('task-total').innerHTML = taskList.length;
  document.getElementById('task-closed').innerHTML = taskList.filter((task) => task.estado === true).length;
};


const changeStatusTask = (id) => {

  const task = taskList.find((task) => task.id === id);
  
  if (task) {
    task.estado = !task.estado;
  } else {
    console.log('Error al cambiar el estado de la tarea');
  }

  renderizarTaskList(taskList);
};

const deleteTask = (id) => {
  const index = taskList.findIndex((task) => task.id === id);

  if (index != -1) {
    taskList.splice(index, 1);
  } else {
    console.log('Error al borrar');
  }

  renderizarTaskList(taskList);
};


const generarId = (taskList) => {
  return taskList.length ? taskList[taskList.length - 1].id + 1 : 1;
};


btnNewTask.addEventListener('click', () => {
 
  if (newTask.value.trim() !== '') {
    const task = {
      id: generarId(taskList),
      taskName: newTask.value,
      estado: false,
    };
    
    taskList.push(task);
    renderizarTaskList(taskList);
    newTask.value = '';
    newTask.focus();

  } else {
    newTask.classList.add('is-invalid');
  }
});


newTask.addEventListener('click', () => {
  newTask.classList.remove('is-invalid');
});


renderizarTaskList(taskList);