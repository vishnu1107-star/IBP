// Run this function as soon as the page opens
window.onload = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/tasks');
        const tasks = await response.json();
        
        // Loop through the tasks from MongoDB and show them on screen
        tasks.forEach(task => {
            renderTask(task);
        });
    } catch (error) {
        console.error("Could not load tasks:", error);
    }
};

async function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value;

    if (!taskText) return;

    // This part sends the data to your server
    const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: taskText, completed: false })
    });

    if (response.ok) {
        const newTask = await response.json();
        renderTask(newTask); // Only add to screen if the database saved it
        input.value = '';
    }
}
function renderTask(task) {
    const list = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = "task-item";
    
    // Add the checkbox with an 'onchange' event
    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} 
            onchange="toggleComplete('${task._id}', this.checked)">
        <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
            ${task.text}
        </span>
        <button onclick="deleteTask('${task._id}', this)" style="color: white; margin-left: 20px;">Delete</button>
    `;
    list.appendChild(li);
}




async function deleteTask(id, buttonElement) {
    if (!confirm("Delete this task?")) return;

    try {
        const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // This removes the item from your screen visually
            buttonElement.parentElement.remove();
        }
    } catch (error) {
        console.error("Error deleting task:", error);
    }
}
async function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value;

    if (!taskText) return;

    // This part sends the data to your server
    const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: taskText, completed: false })
    });

    if (response.ok) {
        const newTask = await response.json();
        renderTask(newTask); // Only add to screen if the database saved it
        input.value = '';
    }
}