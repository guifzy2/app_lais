// Importando módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA9BZ-upgmv7DcMK0n0CtgSUnXq1Mwv6Lk",
    authDomain: "app-lais.firebaseapp.com",
    projectId: "app-lais",
    storageBucket: "app-lais.appspot.com",
    messagingSenderId: "96310588542",
    appId: "1:96310588542:web:b7ce83de88990570fd542f"
};

// Inicializa o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Selecionando elementos HTML
const salvarMencaoButton = document.getElementById("salvar-mencao");
const limparMencoesButton = document.getElementById("limpar-mencoes");
const comentarioInput = document.getElementById("comentario");
const historicoMencoes = document.getElementById("historico-mencoes");

// Carregar histórico ao iniciar
document.addEventListener("DOMContentLoaded", carregarHistorico);

// Salvar Menção no Firestore
salvarMencaoButton.addEventListener("click", async function () {
    const mencaoSelecionada = document.querySelector("input[name='mencao']:checked");
    if (!mencaoSelecionada) {
        alert("Escolha uma menção antes de salvar!");
        return;
    }

    const mencao = mencaoSelecionada.value;
    const comentario = comentarioInput.value.trim();
    const dataAtual = new Date().toLocaleDateString("pt-BR");

    try {
        await addDoc(collection(db, "mencoes"), {
            data: dataAtual,
            mencao: mencao,
            comentario: comentario
        });

        alert("Menção salva com sucesso!");
        carregarHistorico();  // Atualiza a lista
        comentarioInput.value = "";
        mencaoSelecionada.checked = false;
    } catch (error) {
        console.error("Erro ao salvar menção:", error);
    }
});

// Função para carregar histórico de menções do Firestore
async function carregarHistorico() {
    historicoMencoes.innerHTML = "";

    try {
        const querySnapshot = await getDocs(query(collection(db, "mencoes"), orderBy("data", "desc")));

        querySnapshot.forEach((docSnapshot) => {
            const mencao = docSnapshot.data();
            const li = document.createElement("li");
            li.textContent = `${mencao.data} - ${mencao.mencao}: ${mencao.comentario}`;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => excluirMencao(docSnapshot.id));

            li.appendChild(deleteButton);
            historicoMencoes.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao carregar histórico:", error);
    }
}

// Função para excluir uma menção específica
async function excluirMencao(id) {
    if (confirm("Tem certeza que deseja excluir esta menção?")) {
        try {
            await deleteDoc(doc(db, "mencoes", id));
            carregarHistorico();
        } catch (error) {
            console.error("Erro ao excluir menção:", error);
        }
    }
}

// Função para limpar todas as menções
limparMencoesButton.addEventListener("click", async function () {
    if (confirm("Tem certeza que deseja apagar todas as menções?")) {
        try {
            const querySnapshot = await getDocs(collection(db, "mencoes"));

            querySnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(db, "mencoes", docSnapshot.id));
            });

            carregarHistorico();
        } catch (error) {
            console.error("Erro ao limpar menções:", error);
        }
    }
});
