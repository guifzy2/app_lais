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

const recordList = document.getElementById("record-list");
const addRecordButton = document.getElementById("add-record-button");
const recordTitleInput = document.getElementById("record-title");
const recordHolderInput = document.getElementById("record-holder");

async function loadRecords() {
    recordList.innerHTML = "";
    const querySnapshot = await getDocs(collection(db, "records"));
    
    querySnapshot.forEach(doc => {
        const record = doc.data();
        addRecordToList(record.title, record.holder, doc.id);
    });
}

function addRecordToList(title, holder, id) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${title}:</strong> ${holder} 
                    <button class="delete-record" data-id="${id}">❌</button>`;
    recordList.appendChild(li);

    // Adiciona evento de exclusão
    li.querySelector(".delete-record").addEventListener("click", async function () {
        const recordId = this.getAttribute("data-id");
        await deleteDoc(doc(db, "records", recordId));
        loadRecords(); // Atualiza a lista após exclusão
    });
}

addRecordButton.addEventListener("click", async () => {
    const title = recordTitleInput.value.trim();
    const holder = recordHolderInput.value.trim();

    if (!title || !holder) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "records"), { title, holder });
        addRecordToList(title, holder, docRef.id);
        recordTitleInput.value = "";
        recordHolderInput.value = "";
    } catch (error) {
        console.error("Erro ao adicionar recorde:", error);
    }
});

loadRecords();
