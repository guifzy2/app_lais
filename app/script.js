// animacao das folhas
document.addEventListener("DOMContentLoaded", function () {
    const leafContainer = document.querySelector(".falling-leaves");

    // Lista de imagens de folhas/flores
    const leafImages = [
        "img/coracao_vermelho.png",
        "img/valentines-day.png",
        "img/coracao_pixel.webp"
    ];

    function createLeaf() {
        const leaf = document.createElement("div");
        leaf.classList.add("leaf");

        // Escolhe uma imagem aleatória
        const randomImage = leafImages[Math.floor(Math.random() * leafImages.length)];
        leaf.style.backgroundImage = `url('${randomImage}')`;

        // Posição inicial aleatória
        leaf.style.left = `${Math.random() * 100}vw`;
        leaf.style.animationDuration = `${Math.random() * 5 + 5}s`; // Entre 5s e 10s
        leaf.style.animationDelay = `${Math.random() * 3}s`;

        leafContainer.appendChild(leaf);

        // Remove a folha após a animação
        setTimeout(() => {
            leaf.remove();
        }, 8000);
    }

    // Criar folhas constantemente
    setInterval(createLeaf, 700);
});


// Dados das músicas 
const musicas = [
    {
        nome: "Mac Miller - My Favorite Part ft. Ariana Grande",
        src: "musicas/Mac Miller - My Favorite Part (feat. Ariana Grande).mp3"
    },
    {
        nome: "Wallows - You (Show Me Where My Days Went)",
        src: "musicas/Wallows - You (Show Me Where My Days Went).mp3"
    },
    {
        nome: "Allie X - That's So Us",
        src: "musicas/Allie X - That's So Us (Official Audio).mp3"
    },
    {
        nome: "MacDemarco - I Like Her",
        src: "musicas/20191009 I Like Her.mp3"
    },
    {
        nome: "Ariana Grande - The Way ft. Mac Miller",
        src: "musicas/Ariana Grande - The Way ft. Mac Miller.mp3"
    }
];

let currentMusicIndex = 0;
const audioPlayer = new Audio();
audioPlayer.loop = false;
audioPlayer.autoplay = false; 
audioPlayer.src = musicas[currentMusicIndex].src;

// ao acabar a música, troca para a próxima
audioPlayer.addEventListener("ended", () => {
    currentMusicIndex = (currentMusicIndex + 1) % musicas.length;
    audioPlayer.src = musicas[currentMusicIndex].src;
    musicNameDisplay.textContent = musicas[currentMusicIndex].nome;
    playButton.textContent = "⏸"
    audioPlayer.play();
});

const playButton = document.querySelector(".play-button");
const musicNameDisplay = document.querySelector(".music-bar span");
const trocaMusicaButton = document.querySelector(".troca-msc-button");
const trocaMusicaAleatoriaButton = document.querySelector(".troca-msc-aleatoria-button");

musicNameDisplay.textContent = musicas[currentMusicIndex].nome;
playButton.textContent = "⏸"

// Play/Pause
playButton.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = "⏸";
    } else {
        audioPlayer.pause();
        playButton.textContent = "▶";
    }
});

// Declarar histórico fora da função para manter entre cliques
let historico = [];

trocaMusicaAleatoriaButton.addEventListener("click", () => {
    let randomIndex;

    // Gera um índice aleatório diferente do atual e não repetido no histórico
    do {
        randomIndex = Math.floor(Math.random() * musicas.length);
    } while ((randomIndex === currentMusicIndex || historico.includes(randomIndex)) && musicas.length > 1);

    // Atualiza o histórico
    historico.push(randomIndex);
    if (historico.length > 3) {
        historico.shift(); // remove o mais antigo
    }

    // Troca a música
    audioPlayer.src = musicas[randomIndex].src;
    musicNameDisplay.textContent = musicas[randomIndex].nome;
    currentMusicIndex = randomIndex;

    audioPlayer.play();
    playButton.textContent = "⏸";
});

// Trocar música em sequencia
trocaMusicaButton.addEventListener("click", () => {
    currentMusicIndex = (currentMusicIndex + 1) % musicas.length;
    audioPlayer.src = musicas[currentMusicIndex].src;
    musicNameDisplay.textContent = musicas[currentMusicIndex].nome;
    audioPlayer.play();
    playButton.textContent = "⏸";
});

