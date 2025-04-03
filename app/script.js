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


// controlador de musicas
document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.querySelector(".play-button");
    const musicName = document.querySelector(".music-bar span");
    const nextButton = document.querySelector(".troca-msc-button");
    const musicPlayer = document.getElementById("music-player");

    // Lista de músicas com seus nomes
    const musicList = [
        { name: "Allie X - That's So Us", file: "musicas/Allie X - That's So Us (Official Audio).mp3" },
        { name: "Mac DeMarco - I Like Her", file: "musicas/20191009 I Like Her.mp3" }
    ];

    let currentMusicIndex = 0;
    let isPlaying = false;

    // Função para tocar música
    function playMusic() {
        if (!isPlaying) {
            musicPlayer.play();
            playButton.textContent = "⏸"; // Muda para pause
            isPlaying = true;
        } else {
            musicPlayer.pause();
            playButton.textContent = "▶"; // Volta para play
            isPlaying = false;
        }
    }

    // Função para trocar de música
    function nextMusic() {
        currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
        musicPlayer.src = musicList[currentMusicIndex].file;
        musicName.textContent = musicList[currentMusicIndex].name;
        musicPlayer.play();
        playButton.textContent = "⏸";
        isPlaying = true;
    }

    // Garante que a música seja reproduzida novamente ao terminar
    musicPlayer.addEventListener("ended", () => {
        musicPlayer.play();
    });

    // Eventos de clique
    playButton.addEventListener("click", playMusic);
    nextButton.addEventListener("click", nextMusic);

    // Inicia com a primeira música
    musicName.textContent = musicList[currentMusicIndex].name;
});

