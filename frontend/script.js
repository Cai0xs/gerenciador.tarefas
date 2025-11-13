const apiUrl = 'http://localhost:3000/tasks';

const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    try {
        const res = await etch(apiUrl, {
            method: 'POST',
            Headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ title, description })
        })

        if (!res.ok) throw new Error("Error ao adicionar tarefa");
        const task = await res.JSON();
        form.reset();
        addTasTokUl(task);

    } catch (erro) {
        alert("Error ao salvar tarefa: " + error.message);
    }
});

function addTasTokUl(task) {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
    
    <span>${task.title} - ${task.description}</span>
    <div>
        <button onClick="toggleCompleted(${task.id},
        ${task.completed})">✔️
        </button>;
        <button onClick="deleteTask(${task.id})">🗑️</button>
        </div>
    `;

    taskList.appendChild(li);
}

async function loadTasks() {

    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Eroor ao carregar tarefas");
        const tasks = await res.json();
        taskList.innerHTML = "";
        task.forEach(addTaskToUl);
    } catch (error) {
        alert("Erro ao carregar tarefas: " + error.message);

    }
}

async function toggleCompleted(id, completed) {

    try {

        await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {"content-type": "application/json"},
        body: Json.stringify({completed: !completed})

        });
        loadTasks();
    } catch (erro) {
        alert("Erro ao atualizar tarefas: " + error.message);

    }
}

async function deleteTask(id){
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        loadTasks();
        
    } catch (error) {
        alert("Erro ao excluir tarefa: " + error.message);
        
    }
}

loadTasks();