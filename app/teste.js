import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuração do Firebase (substitua pelos seus dados reais)
const firebaseConfig = {
    apiKey: "AIzaSyA9BZ-upgmv7DcMK0n0CtgSUnXq1Mwv6Lk",
    authDomain: "app-lais.firebaseapp.com",
    projectId: "app-lais",
    storageBucket: "app-lais.firebasestorage.app",
    messagingSenderId: "96310588542",
    appId: "1:96310588542:web:b7ce83de88990570fd542f"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Testa conexão ao Firestore
async function testarConexao() {
    try {
        const querySnapshot = await getDocs(collection(db, "checklist"));
        console.log("Conexão bem-sucedida! Dados encontrados:");
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error("Erro ao conectar ao Firestore:", error);
    }
}

// Executar teste ao carregar a página
testarConexao();
