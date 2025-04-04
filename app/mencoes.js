// Importando módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore, collection, addDoc, getDocs,
    deleteDoc, doc, orderBy, query
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA9BZ-upgmv7DcMK0n0CtgSUnXq1Mwv6Lk",
    authDomain: "app-lais.firebaseapp.com",
    projectId: "app-lais",
    storageBucket: "app-lais.appspot.com",
    messagingSenderId: "96310588542",
    appId: "1:96310588542:web:b7ce83de88990570fd542f"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Seletores
const salvarMencaoButton = document.getElementById("salvar-mencao");
const limparMencoesButton = document.getElementById("limpar-mencoes");
const comentarioInput = document.getElementById("comentario");
const historicoMencoes = document.getElementById("historico-mencoes");

let nomeSelecionado = null; // Nome ativo no momento

// Captura clique nos botões de nome
document.querySelectorAll(".month-button").forEach(button => {
    button.addEventListener("click", () => {
        nomeSelecionado = button.dataset.nome;
        document.getElementById("open-nomes-button").textContent = `Selecionado: ${nomeSelecionado} ⬇`;
        carregarHistorico();
    });
});

// Salvar menção
salvarMencaoButton.addEventListener("click", async () => {
    if (!nomeSelecionado) {
        alert("Selecione um nome antes de salvar!");
        return;
    }

    const mencaoSelecionada = document.querySelector("input[name='mencao']:checked");
    if (!mencaoSelecionada) {
        alert("Escolha uma menção antes de salvar!");
        return;
    }

    const mencao = mencaoSelecionada.value;
    const comentario = comentarioInput.value.trim();
    const dataAtual = new Date().toLocaleDateString("pt-BR");

    try {
        await addDoc(collection(db, `mencoes/${nomeSelecionado}/avaliacoes`), {
            data: dataAtual,
            mencao,
            comentario
        });

        alert("Menção salva com sucesso!");
        carregarHistorico();
        comentarioInput.value = "";
        mencaoSelecionada.checked = false;
    } catch (error) {
        console.error("Erro ao salvar menção:", error);
    }
});

// Carrega histórico
async function carregarHistorico() {
    historicoMencoes.innerHTML = "";

    if (!nomeSelecionado) return;

    try {
        const querySnapshot = await getDocs(query(
            collection(db, `mencoes/${nomeSelecionado}/avaliacoes`),
            orderBy("data", "desc")
        ));

        querySnapshot.forEach((docSnapshot) => {
            const mencao = docSnapshot.data();
            const li = document.createElement("li");
            li.textContent = `${mencao.data} - ${mencao.mencao}: ${mencao.comentario}`;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () =>
                excluirMencao(docSnapshot.id)
            );

            li.appendChild(deleteButton);
            historicoMencoes.appendChild(li);
        });
    } catch (error) {
        console.error("Erro ao carregar histórico:", error);
    }
}

// Excluir menção específica
async function excluirMencao(id) {
    if (!nomeSelecionado) return;

    if (confirm("Tem certeza que deseja excluir esta menção?")) {
        try {
            await deleteDoc(doc(db, `mencoes/${nomeSelecionado}/avaliacoes`, id));
            carregarHistorico();
        } catch (error) {
            console.error("Erro ao excluir menção:", error);
        }
    }
}

// Limpar todas as menções do nome atual
limparMencoesButton.addEventListener("click", async () => {
    if (!nomeSelecionado) {
        alert("Selecione um nome para limpar as menções!");
        return;
    }

    if (confirm("Tem certeza que deseja apagar todas as menções?")) {
        try {
            const querySnapshot = await getDocs(
                collection(db, `mencoes/${nomeSelecionado}/avaliacoes`)
            );

            querySnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(db, `mencoes/${nomeSelecionado}/avaliacoes`, docSnapshot.id));
            });

            carregarHistorico();
        } catch (error) {
            console.error("Erro ao limpar menções:", error);
        }
    }
});

// Alterna visibilidade do menu de nomes
const openNomesButton = document.getElementById("open-nomes-button");
const nomeDropdown = document.getElementById("nome-dropdown");

openNomesButton.addEventListener("click", () => {
    nomeDropdown.classList.toggle("hidden");
});

document.addEventListener("click", (event) => {
    if (!nomeDropdown.contains(event.target) && event.target !== openNomesButton) {
        nomeDropdown.classList.add("hidden");
    }
});
