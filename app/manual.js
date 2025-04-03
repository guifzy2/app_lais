import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const manualList = document.getElementById("manual-list");
const addManualButton = document.getElementById("add-manual-button");
const manualTextInput = document.getElementById("manual-text");

const defaultManualItems = [
    "Não acordar a princesa de manhã no sábado",
    "Não fazer pacto por loiras",
    "Não esquecer de ser um príncipe",
    "Lembrar de alimentá-la"
];

async function loadManual() {
    manualList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "manual"));

    if (querySnapshot.empty) {
        // Se Firestore estiver vazio, adiciona regras padrão
        for (const rule of defaultManualItems) {
            await addDoc(collection(db, "manual"), { text: rule });
        }
        loadManual(); // Recarrega a lista após adicionar os itens padrão
        return;
    }

    querySnapshot.forEach(doc => {
        const rule = doc.data();
        addManualToList(rule.text, doc.id);
    });
}

function addManualToList(text, id) {
    const li = document.createElement("li");
    li.innerHTML = `${text} <button class="delete-manual" data-id="${id}">❌</button>`;
    manualList.appendChild(li);

    // Adiciona evento para deletar a regra
    li.querySelector(".delete-manual").addEventListener("click", async function () {
        const ruleId = this.getAttribute("data-id");
        await deleteDoc(doc(db, "manual", ruleId));
        loadManual(); // Atualiza a lista após exclusão
    });
}

addManualButton.addEventListener("click", async () => {
    const text = manualTextInput.value.trim();

    if (!text) {
        alert("Digite uma regra válida!");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "manual"), { text });
        addManualToList(text, docRef.id);
        manualTextInput.value = "";
    } catch (error) {
        console.error("Erro ao adicionar regra:", error);
    }
});

loadManual();
