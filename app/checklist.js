document.addEventListener("DOMContentLoaded", function () {
    const checklist = document.getElementById("checklist");
    const newItemInput = document.getElementById("new-item");
    const addItemButton = document.getElementById("add-item-button");

    // Lista padrão de tarefas
    const defaultTasks = [
        "Arrumar o cabelo de manhã",
        "Ver seu homem sigma",
        "Dormir quase o dia todo",
        "Fingir que estuda",
        "Ler seus livros",
        "Fingir que treina",
        "Ser a mulher mais bonita que existe"
    ];

    // Recuperar tarefas salvas ou usar padrão
    let tasks = JSON.parse(localStorage.getItem("tasks")) || defaultTasks.map(task => ({ text: task, done: false }));

    // Verifica se já passou 24h para resetar a checklist
    function checkResetTime() {
        const lastReset = localStorage.getItem("lastResetTime");
        const now = new Date().getTime();
        if (!lastReset || now - lastReset > 24 * 60 * 60 * 1000) {
            localStorage.setItem("tasks", JSON.stringify(defaultTasks.map(task => ({ text: task, done: false }))));
            localStorage.setItem("lastResetTime", now);
            tasks = defaultTasks.map(task => ({ text: task, done: false }));
        }
    }

    checkResetTime();

    // Função para renderizar a checklist
    function renderChecklist() {
        checklist.innerHTML = "";
        tasks.forEach((task, index) => {
            if (task.done) return; // Remove tarefas concluídas da tela

            const li = document.createElement("li");
            li.classList.add("checklist-item");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.done;
            checkbox.addEventListener("change", () => {
                tasks[index].done = checkbox.checked;
                saveTasks();
            });

            const label = document.createElement("span");
            label.textContent = task.text;

            li.appendChild(checkbox);
            li.appendChild(label);
            checklist.appendChild(li);
        });
    }

    // Função para salvar tarefas no localStorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderChecklist();
    }

    // Adicionar nova tarefa
    addItemButton.addEventListener("click", function () {
        const newText = newItemInput.value.trim();
        if (newText !== "") {
            tasks.push({ text: newText, done: false });
            newItemInput.value = "";
            saveTasks();
        }
    });

    // Renderizar checklist ao carregar a página
    renderChecklist();
});
