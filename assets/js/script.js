// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) ||[];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// const taskDisplayEl = $('#task-display');
// const taskFormEl = $('#task-form');
const toDoInputEl = $('#to-do-input');
const inProgressInputEl = $('#in-progress-input');
const doneInputEl = $('#done-input');
const saveTaskButton = $('#save-task-btn');
const taskNameInputEl = $('#task-title');
const projectTypeInputEl = $('#task-info');
const projectDateInputEl = $('#due-date');


const form = document.querySelector('form');






// Todo: create a function to generate a unique task id
// function generateTaskId() {

// }

function createTaskCard(task) {
    console.log(task)
    const taskCard = $('<div>')
    .addClass('card-body, bg-light')
    .attr('data-task-id', task.id);
    
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body bg-light');
    const cardDescription = $('<p>').addClass('card-body bg light').text(task.status);
    const cardDueDate = $('<p>').addClass('card-body bg-light').text(task.completion);
    const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);
    console.log(taskCard)
    return taskCard;
} 


function printTaskData() {
const tasks = JSON.parse(localStorage.getItem("tasks")) ||[];
    
    for (let task of tasks) {
        const tasksEl = createTaskCard(task)
        console.log(tasksEl)
        if (task.status === 'to-do') {
            $('#todo-cards').append(tasksEl);
        } else if (task.status === 'in-progress') {
            $('#in-progress-cards').append(tasksEl);
        } else if (task.status === 'done') {
           $('#done-cards').append(tasksEl);
        }
    }

    $('.draggable').draggable( {
    opacity: 0.7,
    zIndex: 100,
    helper: function (e) {
        const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
        return original.clone().css({
            windth: original.outerWidth(),
        });
    },
});
    
};


// localStorage.setItem('readTasksFromStorage', taskList)
function handleDeleteTask(){
    const taskId= $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();

    tasks.forEach((tasks) => {
        // error made me pluralize tasks for some reason (tasks.splice)
        if (tasks.id === taskId) {
            tasks.splice(tasks.indexOf(task), 1);
            // the 3rd task here is singular all others above i pluralized
        }
    });

    saveTasksToStorage(tasks);
    printTaskData(tasks);
    // added the tasks inside the print task 
}

function generateTaskId(){
    
    
return `task-${Date.now()}`

}

function handleTaskFormSubmit(event) {
    event.preventDefault();
    // console.log('hello')
    const taskNameInput = taskNameInputEl.val().trim();
    const projectType = projectTypeInputEl.val();
    const projectDate = projectDateInputEl.val();
    const newTask = {
    
        name: taskNameInput,
        status: projectType,
        completion: projectDate,
        status: 'to-do',
        id: generateTaskId(),
    };
    console.log(newTask)
    console.log(taskList)
    taskList.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(taskList));

    createTaskCard(taskList)




printTaskData();
$('#formModal').modal('hide')
toDoInputEl.val('');
inProgressInputEl.val('');
doneInputEl.val('');

}

function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;
    for (let tasks of tasks) {
        if (tasks.id === taskId) {
            tasks.status = newStatus;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    printTaskData();
}


$(document).ready(function () {
    saveTaskButton.on('click', handleTaskFormSubmit);
projectDateInputEl.on('click', '.btn-delete-task', handleDeleteTask);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const obj = Object.fromEntries(fd);
    
        const json = JSON.stringify(obj);
        localStorage.setItem('form', json);
    
        window.localStorage.href = "tasks";
    })
    // printTaskData();
    $('#taskDueDate').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    $('.lane').droppable({
        accept: '.draggable', drop: handleDrop,
    });
});










// Todo: create a function to create a task card
// function createTaskCard(task) {

// }

// Todo: create a function to render the task list and make cards draggable
// function renderTaskList() {

// }

// Todo: create a function to handle adding a new task
// function handleAddTask(event){

// }

// Todo: create a function to handle deleting a task
// function handleDeleteTask(event){

// }

// Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {

// }

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {

// });
