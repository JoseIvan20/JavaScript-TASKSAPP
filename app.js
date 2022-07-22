document.getElementById('formTask').addEventListener('submit', saveTask);

//Aqui se llenan los datos de titulo y descripcion e imprimir su valor por consola
function saveTask(e) {

    let title =  document.getElementById('title').value;
    let description = document.getElementById('description').value;

    //Para convertir un objeto a un string, se puede utiizar JSON.stringify, inea 14.
    const task = {
        title, //title: title
        description //description: description
    };
    //Application de la consola de google
    //setItem, set = guardar
    //localStorage.setItem('tasks', JSON.stringify(task));
    //getItem, get = obtener
    //console.log(JSON.parse(localStorage.getItem('tasks')));

    //Si el localSDtorage esta vacio, empieza agregar una nueva tarea, si existen, almacenalas nuevamente
    if (localStorage.getItem('tasks') === null){
        let tasks = [];
        //push se encarga de ingresar un dato al arrelo
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks();
    document.getElementById('formTask').reset();
    e.preventDefault();
}

function getTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for (let i = 0; i <tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;

        // += Para ver todas las tareas listadas, para que toda tarea se vaya añadiendo
        tasksView.innerHTML += `<div class="card mb-4">
        <div class="card-body">
        <p> ${title} - ${description} </p>
            <a class="btn btn-danger" onclick="deleteTask('${title}')">  
            Delete
            </a>
            </div> 
        </div>`
    }
}

function deleteTask(title){
    let tasks = JSON.parse (localStorage.getItem('tasks'));
    
    for (let i = 0; i <tasks.length; i++) {
        if (tasks[i].title == title) {
            //Splice se encarga de eliminar un dato
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}


getTasks();