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

//pagina saudade

document.addEventListener("DOMContentLoaded", function () {
    const photos = [
        { src: "img/primeiro_enc.jpeg", caption: "Eu e a mulher dos olhos mais lindos que existem" },
        { src: "img/filme.jpeg", caption: "A gente deveria ter visto outro filme sem ser a porra do macaco" },
        { src: "img/amstel.jpeg", caption: "Isso é que eu nem gosto tanto de amstel" },
        { src: "img/bone.jpeg", caption: "Até eu molhei aq…" },
        { src: "img/shape.jpeg", caption: "Quando eu treinava ainda" },
        { src: "img/guitarra.jpeg", caption: "Seu homem no ensino médio" },
        { src: "img/trampo.jpeg", caption: "Eu me arrombando no presencial" },
        { src: "img/antes_lais.jpeg", caption: "Seu homem antes de você" },
        { src: "img/dormindo.jpeg", caption: "Eu sendo sigma" },
    ];

    let currentPhotoIndex = 0;
    
    const photoElement = document.getElementById("memory-photo");
    const captionElement = document.getElementById("caption");
    const counterElement = document.getElementById("photo-counter");
    const changePhotoButton = document.getElementById("change-photo-button");

    // Atualiza a foto e legenda
    function updatePhoto() {
        photoElement.src = photos[currentPhotoIndex].src;
        captionElement.textContent = photos[currentPhotoIndex].caption;
        counterElement.textContent = `${currentPhotoIndex + 1}/${photos.length}`;
    }

    // Evento de clique para trocar a foto
    changePhotoButton.addEventListener("click", () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updatePhoto();
    });

    // Atualiza a primeira imagem ao carregar a página
    updatePhoto();
});

// pagina romantico

document.addEventListener("DOMContentLoaded", function () {
    const frases = [
        { caption: "Destino é besteira, mas quando eu te vi, falei pros meus amigos a única coisa que veio na minha cabeça: 'acho que eu vi a mulher mais bonita do mundo, vou ter que casar com ela'." },
        { caption: "Sempre que olho no seus olhos eu me perco na profundidade do olhar mais bonito do mundo, é como se ele tivesse sido feito pra ser encarado e mergulado na beleza e complexidade." },
        { caption: "Adoro seu cabelo. Cada movimento no vento, a forma como arruma a franja, quando você prende ele, tudo me deixa idiota de como consegue ser tão bonito" },
        { caption: "Gosto muito de te ver de óculos, parece que eu estou te vendo no seu eu mais natural e confortavel, e de alguma forma, você sempre consegue ficar mais bonita e boa quando usa eles..." },
        { caption: "Sua franja quando tá pro lado me traz outra visão de você, como se tivesse ficado mais complexa, mais elegante. Adiciona mais um detalhe na sua beleza que me hiponitiza do nada" },
        { caption: "É uma covardia você ter um sorriso e uma boca tão bonita, parece que eu sempre queiro te beijar e te ter pra mim, ao mesmo tempo que quando eu te faço rir, você sempre me mostra um sorriso sincero e lindo" },
        { caption: "Seu corpo parece que foi feito pra desligar meu cerebro. Sempre que eu fico com você o lobo frontal para e eu só consigo pensar em como a mulher mais bonita do mundo tá no meu colo... Isso fora meu lugar favorito k" },
        { caption: "Adoro ouvir você falando pra krl, acho que eu nunca conheçi alguem que fala tanto mas ao mesmo tempo eu quero ouvir mais. Tem alguma coisa na sua voz que me prende, ainda tenho que descobiri que porra foi que você fez comigo" },
        { caption: "Por enquanto é só, essa parte vai receber atualizações periódicas, não se preocupe princesa" }
    ];

    let currentPhraseIndex = 0;
    const captionElement = document.getElementById("frase");
    const counterElement = document.getElementById("phrase-counter");
    const changePhraseButton = document.getElementById("change-phrase-button");

    // Atualiza a frase e contador
    function updatePhrase() {
        captionElement.textContent = frases[currentPhraseIndex].caption;
        counterElement.textContent = `${currentPhraseIndex + 1}/${frases.length}`;
    }

    // Evento de clique para trocar a frase
    changePhraseButton.addEventListener("click", () => {
        currentPhraseIndex = (currentPhraseIndex + 1) % frases.length;
        updatePhrase();
    });

    // Atualiza a primeira frase ao carregar a página
    updatePhrase();
});
