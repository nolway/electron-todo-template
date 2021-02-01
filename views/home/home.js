const taskInput = document.getElementById('newTask');
const addTaskButton = document.getElementsByTagName('button')[0];
const undoneTasks = document.getElementsByClassName('list-unstyled')[0];
const doneTasks = document.getElementById('completedTasks');

const createNewTaskElement = (taskString) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'd-flex mb-4');

    const checkBox = document.createElement('input');
    checkBox.setAttribute('class', 'mt-11');
	
	const label = document.createElement('label');
    const editInput = document.createElement('input');
    editInput.setAttribute('class', 'form-control mr-1 ml-2')
    editInput.value = taskString;
    const editButton = document.createElement('button');
	const deleteButton = document.createElement('button');

    checkBox.type = 'checkbox';
	editInput.type = 'text';
	editButton.innerText = 'Modifier';
	editButton.className = 'edit btn btn-primary btn-sm ml-2';
	deleteButton.innerText = 'Supprimer';
	deleteButton.className = 'delete btn btn-danger btn-sm ml-2';

    listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

	return listItem;
}

const addTask = () => {
	const listItem = createNewTaskElement(taskInput.value);
	undoneTasks.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
	taskInput.value = '';
}

const editTask = () => {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('input[type=text]');
    const label = listItem.querySelector('label');
    const containsClass = listItem.classList.contains('editMode');

    if (containsClass) {
        label.innerText = editInput.value;
    }
    else {
        editInput.value = label.innerText;
    }

    listItem.classList.toggle('editMode');
}

function deleteTask() {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
}

const taskCompleted = function() {
    const listItem = this.parentNode;
    doneTasks.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
    const listItem = this.parentNode;
    undoneTasks.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

addTaskButton.addEventListener('click',addTask);

const bindTaskEvents = (taskListItem,checkBoxEventHandler) => {
	const checkBox = taskListItem.querySelector('input[type=checkbox]');
	const editButton = taskListItem.querySelector('button.edit');
	const deleteButton = taskListItem.querySelector('button.delete');
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < undoneTasks.children.length; i++){
    bindTaskEvents(undoneTasks.children[i], taskCompleted);
}

for (let i = 0; i < doneTasks.children.length; i++){
    bindTaskEvents(doneTasks.children[i], taskIncomplete);
}