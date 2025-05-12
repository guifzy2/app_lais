// animacao das folhas
document.addEventListener("DOMContentLoaded", function () {
    const leafContainer = document.querySelector(".falling-leaves");

    // Lista de imagens de folhas/flores
    const leafImages = [
        "img/rosa.png",
        "img/folha.png",
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
audioPlayer.loop = true;
audioPlayer.autoplay = false;
audioPlayer.src = musicas[currentMusicIndex].src;

const playButton = document.querySelector(".play-button");
const musicNameDisplay = document.querySelector(".music-bar span");
const trocaMusicaButton = document.querySelector(".troca-msc-button");

musicNameDisplay.textContent = musicas[currentMusicIndex].nome;

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

// Trocar música
trocaMusicaButton.addEventListener("click", () => {
    currentMusicIndex = (currentMusicIndex + 1) % musicas.length;
    audioPlayer.src = musicas[currentMusicIndex].src;
    musicNameDisplay.textContent = musicas[currentMusicIndex].nome;
    audioPlayer.play();
    playButton.textContent = "⏸";
});

