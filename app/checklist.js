import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA9BZ-upgmv7DcMK0n0CtgSUnXq1Mwv6Lk",
    authDomain: "app-lais.firebaseapp.com",
    projectId: "app-lais",
    storageBucket: "app-lais.firebasestorage.app",
    messagingSenderId: "96310588542",
    appId: "1:96310588542:web:b7ce83de88990570fd542f"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const checklist = document.getElementById("checklist");
const newItemInput = document.getElementById("new-item");
const addItemButton = document.getElementById("add-item-button");

// Lista fixa de tarefas padrão
const defaultTasks = [
    "Arrumar o cabelo de manhã",
    "Ver seu homem sigma",
    "Dormir quase o dia todo",
    "Fingir que estuda",
    "Ler seus livros",
    "Fingir que treina",
    "Ser a mulher mais bonita que existe"
];

// Verifica se já passou 24h para restaurar as tarefas padrão
function verificarResetTarefas() {
    const ultimoReset = localStorage.getItem("ultimoReset") || 0;
    const agora = Date.now();

    if (agora - ultimoReset > 24 * 60 * 60 * 1000) { // Se passou 24h
        localStorage.setItem("ultimoReset", agora);
        localStorage.removeItem("tarefasOcultas"); // Limpa lista de tarefas ocultas
    }
}

// Carrega as tarefas do Firestore e exibe a checklist
async function carregarTarefas() {
    checklist.innerHTML = "";

    verificarResetTarefas();

    // Recupera tarefas padrão ocultas
    const tarefasOcultas = JSON.parse(localStorage.getItem("tarefasOcultas")) || [];

    // Adicionar tarefas padrão, ignorando as que foram ocultadas
    defaultTasks.forEach(task => {
        if (!tarefasOcultas.includes(task)) {
            adicionarElementoLista(task, null, true);
        }
    });

    // Buscar tarefas do Firestore
    const querySnapshot = await getDocs(collection(db, "checklist"));
    querySnapshot.forEach((docRef) => {
        const tarefa = docRef.data().tarefa;
        adicionarElementoLista(tarefa, docRef.id, false);
    });
}

// Adiciona uma nova tarefa ao Firestore e à tela
async function adicionarTarefa() {
    const tarefaTexto = newItemInput.value.trim();
    if (!tarefaTexto) return alert("Digite uma tarefa!");

    // Salvar no Firebase
    const docRef = await addDoc(collection(db, "checklist"), { tarefa: tarefaTexto });

    // Adicionar na lista
    adicionarElementoLista(tarefaTexto, docRef.id, false);

    // Limpar input
    newItemInput.value = "";
}

// Adiciona um item na lista com checkbox funcional
function adicionarElementoLista(tarefaTexto, id, isDefault) {
    const li = document.createElement("li");
    li.classList.add("checklist-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", async () => {
        if (isDefault) {
            // Se for uma tarefa padrão, salva no localStorage e oculta
            let tarefasOcultas = JSON.parse(localStorage.getItem("tarefasOcultas")) || [];
            tarefasOcultas.push(tarefaTexto);
            localStorage.setItem("tarefasOcultas", JSON.stringify(tarefasOcultas));
        } else if (id) {
            // Se for uma tarefa do Firebase, exclui do banco
            await deleteDoc(doc(db, "checklist", id));
        }
        li.remove(); // Remove da tela
    });

    const label = document.createElement("span");
    label.textContent = tarefaTexto;

    li.appendChild(checkbox);
    li.appendChild(label);
    checklist.appendChild(li);
}

// Evento para adicionar tarefa
addItemButton.addEventListener("click", adicionarTarefa);

// Carregar tarefas ao abrir a página
carregarTarefas();