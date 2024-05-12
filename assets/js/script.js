// Retrieve tasks and nextId from localStorage
// let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

const toDoInputEl = $('#to-do-input');
const inProgressInputEl = $('#in-progress-input');
const doneInputEl = $('#done-input');


const toDo = toDoInputEl.val();
const inProgress = inProgressInputEl.val();
const done = doneInputEl.val();


const generateTasks = {
    name: toDo,
    status: inProgress,
    completion: done,
    status: 'to-do',
   
};







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
            todoList.append(createTaskCard(task));
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
        if (task.id === taskId) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    saveTasksToStorage(tasks);
    printTaskData();
}



const tasks = readTasksFromStorage();
tasks.push(generateTasks);

saveTasksToStorage(tasks);

printTaskData();

function handleTaskFormSubmit(event) {
    event.preventDefault();
}


// Todo: create a function to generate a unique task id
function generateTaskId() {

}






// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
