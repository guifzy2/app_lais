import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA9BZ-upgmv7DcMK0n0CtgSUnXq1Mwv6Lk",
    authDomain: "app-lais.firebaseapp.com",
    projectId: "app-lais",
    storageBucket: "app-lais.appspot.com",
    messagingSenderId: "96310588542",
    appId: "1:96310588542:web:b7ce83de88990570fd542f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Configuração da API do Google Drive
const CLIENT_ID = "1073763696124-lq84dn5u61qmdmqhhn11k49huukdi32h.apps.googleusercontent.com";
const FOLDER_ID = "1QYRojkAr9Vh0ufyc4WAaAk6JJzr9w5Kv";  // Substitua pelo ID da sua pasta no Google Drive
const API_KEY = "AIzaSyAP7jIBI420R_F5xglvc6wIdilxb7VmY8w";    // Substitua pela sua chave de API
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/drive.file";

// Elementos do DOM
const openMonthsButton = document.getElementById("open-months-button");
const monthDropdown = document.getElementById("month-dropdown");
const monthButtons = document.querySelectorAll(".month-button");
const eventList = document.getElementById("event-list");
const selectedMonthTitle = document.getElementById("selected-month-title");
const eventDateInput = document.getElementById("event-date");
const eventDescriptionInput = document.getElementById("event-description");
const eventImageInput = document.getElementById("event-image");
const addEventButton = document.getElementById("add-event-button");

let selectedMonth = 2;

// Eventos predefinidos
const events = {
    2: [
        { date: "14/02/2025", description: "Amassei na primeira mensagem pra princesa", image: "img/lais1.jpeg" },
        { date: "21/02/2025", description: "Laís falando que eu tremi no primeiro encontro kk", image: "" },
        { date: "28/02/2025", description: "Laís perdeu a calota do carro KKKKKKKKKKKKKKKKKKK", image: "" }
    ],
    3: [
        { date: "01/03/2025", description: "Primeira vez que saímos e fomos pro marcinho ❤", image: "img/primeiro_enc.jpeg" },
        { date: "15/03/2025", description: "Laís descobriu que nem todo lugar com sinuca só tem favelado", image: "img/sinuca.jpeg" },
        { date: "21/03/2025", description: "Primeiro filme que vi com a mulher mais bonita do mundo", image: "img/filme.jpeg" },
        { date: "23/03/2025", description: "Pelo incrível que pareça, Laís conheceu minha mãe", image: "img/lais_mae.jpeg" }
    ]
};

// Inicializar API do Google
gapi.load("client:auth2", () => {
    gapi.auth2.init({ client_id: CLIENT_ID }).then(() => {
        console.log("Google API carregada com sucesso!");
    }).catch(err => console.error("Erro ao carregar API:", err));
});

// Autenticar usuário
function authenticate() {
    return gapi.auth2.getAuthInstance().signIn({ scope: SCOPES });
}

// Carregar API do Google Drive
function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/drive/v3/rest");
}

// **Função para fazer upload no Google Drive para uma pasta específica**
async function uploadToGoogleDrive(file) {
    try {
        await authenticate(); // Autentica o usuário
        
        let metadata = {
            name: file.name,
            mimeType: file.type,
            parents: [FOLDER_ID] // Enviar para a pasta específica
        };

        let formData = new FormData();
        formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
        formData.append("file", file);

        // Faz o upload do arquivo para o Google Drive
        const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token
            },
            body: formData
        });

        const data = await response.json();
        if (!data.id) throw new Error("Falha no upload");

        // **Torna o arquivo público**
        await fetch(`https://www.googleapis.com/drive/v3/files/${data.id}/permissions`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ role: "reader", type: "anyone" }) // Permissão pública
        });

        // **Retorna o link público**
        const fileUrl = `https://drive.google.com/uc?id=${data.id}`;
        console.log("Upload concluído! Link público:", fileUrl);
        return fileUrl;

    } catch (error) {
        console.error("Erro ao enviar imagem:", error);
        return null;
    }
}

// Formatação de data
function formatDateToDisplay(date) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
}

function formatDateToSort(date) {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
}

// Carregar eventos do mês selecionado
async function loadEvents(month) {
    eventList.innerHTML = "";

    selectedMonthTitle.textContent = `Eventos de ${["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][month - 1]}`;

    let allEvents = [];

    // Adicionar eventos predefinidos
    if (events[month]) {
        events[month].forEach(event => allEvents.push(event));
    }

    // Adicionar eventos do Firestore
    const querySnapshot = await getDocs(collection(db, `timeline/${month}/events`));
    querySnapshot.forEach(doc => {
        const event = doc.data();
        allEvents.push({ id: doc.id, ...event });
    });

    allEvents.sort((a, b) => formatDateToSort(a.date).localeCompare(formatDateToSort(b.date)));

    allEvents.forEach(event => addEventToList(event.date, event.description, event.image, event.id));
}

// Adicionar evento à lista
function addEventToList(date, description, imageUrl, id = null) {
    const eventElement = document.createElement("li");
    eventElement.classList.add("event-item");
    eventElement.innerHTML = `
        <img src="${imageUrl || "img/placeholder.jpg"}" class="event-image">
        <div class="event-details">
            <p class="event-date">${date}</p>
            <p class="event-description">${description}</p>
        </div>
    `;

    if (id) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", async () => {
            await deleteDoc(doc(db, `timeline/${selectedMonth}/events`, id));
            loadEvents(selectedMonth);
        });
        eventElement.appendChild(deleteButton);
    }

    eventList.appendChild(eventElement);
}

// Adicionar evento ao Firestore
addEventButton.addEventListener("click", async () => {
    const date = eventDateInput.value;
    const description = eventDescriptionInput.value;
    const imageFile = eventImageInput.files[0];

    if (!date || !description) {
        alert("Preencha todos os campos!");
        return;
    }

    let imageUrl = "";
    if (imageFile) {
        imageUrl = await uploadToGoogleDrive(imageFile);
        if (!imageUrl) {
            alert("Erro ao enviar a imagem.");
            return;
        }
    }

    const formattedDate = formatDateToDisplay(date);

    try {
        await addDoc(collection(db, `timeline/${selectedMonth}/events`), { 
            date: formattedDate, 
            description, 
            image: imageUrl 
        });
        loadEvents(selectedMonth);
    } catch (error) {
        alert("Erro ao adicionar evento.");
    }
});

// Alternar exibição do menu suspenso
openMonthsButton.addEventListener("click", () => {
    monthDropdown.classList.toggle("hidden");
});

monthButtons.forEach(button => {
    button.addEventListener("click", function () {
        selectedMonth = parseInt(this.getAttribute("data-month"));
        loadEvents(selectedMonth);
        monthDropdown.classList.add("hidden");
    });
});

loadEvents(selectedMonth);

