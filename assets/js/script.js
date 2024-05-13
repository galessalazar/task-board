// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const taskDisplayEl = $('#task-display');
const taskFormEl = $('#task-form');
const toDoInputEl = $('#to-do-input');
const inProgressInputEl = $('#in-progress-input');
const doneInputEl = $('#done-input');

const taskNameInputEl = $('#task-name-input');
const projectTypeInputEl = $('#project-type-input');
const projectDateInputEl = $('#taskDueDate');

function createModalCard(modal) {
    const modalCard =$('<div>')
.attr('data-task-id', myInput.id);
const myModal = document.getElementsByClassName('modal')
const myInput = document.getElementsByClassName('modal-content')
const btnSuccess = $('<button>').addClass('btn btn-success add task').text('Add Task').attr('data-task-id', modal.id);
btnSuccess.on('click', modal.id);
modal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

document.querySelectorAll('.btn').forEach(buttonElement => {
    const button = bootstrap.Button.getOrCreateInstance(buttonElement)
    button.toggle()
  })

}







function readTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
        tasks = [];
    }
    return tasks;
}

function saveTasksToStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// started using singular task here not sure why
function createTaskCard(task) {
    const taskCard = $('<div>')

    // i think the my-3 is the spacing in bootstrap
    .addClass('card task-card draggable my -3')
    .attr('data-task-id', task.id);
    
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.type);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>').addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task.id);
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
    return taskCard;
}

function printTaskData() {
    const tasks = readTasksFromStorage(); 

    const toDoList = $('#todo-cards');
    toDoList.empty();
    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();
    const doneList = $('#done-cards');
    doneList.empty();

    for (let task of tasks) {
        if (task.status === 'to-do') {
            toDoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
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


}

function handleDeleteTask(){
    const taskId= $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();

    tasks.forEach((tasks) => {
        // error made me pluralize tasks for some reason (tasks.splice)
        if (tasks.id === taskId) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    saveTasksToStorage(tasks);
    printTaskData();
}

function handleTaskFormSubmit(event) {
    event.preventDefault();

    const taskNameInputEl = taskNameInputEl.val().trim();
    const projectType = projectTypeInputEl.val();
    const projectDate = projectDateInputEl.val();
// i may need to delete these 3 lines below
    const toDo = toDoInputEl.val();
const inProgress = inProgressInputEl.val();
const done = doneInputEl.val();


const generateTasks = {
    name: taskName,
    status: projectType,
    completion: projectDate,
    status: 'to-do',
   
};


const tasks = readTasksFromStorage();
tasks.push(generateTasks);

saveTasksToStorage(tasks);

printTaskData();

toDoInputEl.val('');
inProgressInputEl.val('');
doneInputEl.val('');

}

function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();
    const taskId = ui.draggable[0].dataset.taskId;
    const newStatus = event.target.id;
    for (let task of tasks) {
        if (task.id === taskId) {
            task.status = newStatus;
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    printTaskData();
}

taskFormEl.on('submit', handleTaskFormSubmit);
taskDisplayEl.on('click', '.btn-delete-task', handleDeleteTask);
$(document).ready(function () {
    printTaskData();
    $('#taskDueDate').datepicker({
        changeMonth: true,
        changeYear: true,
    });

    $('.lane').droppable({
        accept: '.draggable', drop: handleDrop,
    });
});



// Todo: create a function to generate a unique task id
// function generateTaskId() {

// }






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
