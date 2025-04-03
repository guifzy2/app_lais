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

// Chave da API do ImgBB (Pegue a sua em https://api.imgbb.com/)
const IMGBB_API_KEY = "9e78b56bf6391a68ce275165fa38e99d";

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

// Função para fazer upload no ImgBB
async function uploadToImgBB(file) {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            console.log("Imagem enviada! Link:", data.data.url);
            return data.data.url; // Retorna o link da imagem
        } else {
            throw new Error("Falha no upload");
        }
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
        imageUrl = await uploadToImgBB(imageFile);
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
