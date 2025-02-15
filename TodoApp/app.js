const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const tasklist = document.querySelector('.collection');



// load event
loadEventListener();

// load all event listeners
function loadEventListener() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //filter tasks events
    filter.addEventListener('keyup', filterTasks);
}
//Get tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
} else {
   tasks = JSON.parse(localStorage.getItem('tasks')); 
}
tasks.forEach(function(task){
    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and appand to li
    li.appendChild(document.createTextNode(task));
    //create new link
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //appand link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
});
}
//Add Task
function addTask(e){
    if(taskInput.value ===''){
        alert('add a task');
    }

    //create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and appand to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //appand link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value)
    //clear input
    taskInput.value ='';


    e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
} else {
   tasks = JSON.parse(localStorage.getItem('tasks')); 
}
tasks.push(task);
localStorage.setItem('tasks', JSON.stringify(tasks));
}
//remove task
 function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //Remove from Ls
            removeTaskFromlocalStorage
            (e.target.parentElement.parentElement);
        }
    }
 }

 //Remove from LS
 function removeTaskFromlocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
} else {
   tasks = JSON.parse(localStorage.getItem('tasks')); 
}
   tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
        tasks.splice(index, 1);
    }
   });
   localStorage.setItem('tasks', JSON.stringify(tasks));
 } 

 //clear task
 function clearTasks() {
    taskList.innerHTML = '';
 //clear   from LS
 clearTasksFromlocalStorage(); 
 }

 //clear from LS
 function clearTasksFromlocalStorage() {
    localStorage.clear();
 }

 //filter task
 function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) !=-1){
        task.style.display = 'block';
    } else{
        task.style.display = 'none';
    }
    });
 }