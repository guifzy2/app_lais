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


// Dados das memórias
const memories = [
    {
        src: "img/btnSecreto/primeiro_enc.jpeg",
        caption: "Eu realmente não sou muito um cara de acreditar em destino, mas cada passo que eu dou com você, cada sorriso seu que eu vejo, cada lembrança que eu tenho, tudo isso conseguiu me fazer acreditar que o destino existe e que ele me trouxe você.",
        frase: "Quando eu me liguei que tava ficando apaixonado por você 🌹"
    },
    {
        src: "img/btnSecreto/hotzone.jpeg",
        caption: "A tranquilidade que você me traz é algo que eu nunca tinha sentido antes, e eu não falo de modo clichê, eu realmente sinto isso. Você é a única pessoa que me fez sentir assim, e isso me deixa cada vez mais apaixonado, as risadas que eu dou com você, os momentos que eu passo com você, tudo isso me faz sentir que eu sou o homem mais sortudo do mundo.",
        frase: "Até sendo muito ruim em todos os jogos, eu não consigo parar de ficar admirando você em tudo que faz."
    },
    {
        src: "img/btnSecreto/jardim.jpeg",
        caption: "Nunca achei que 12 horas com você me fariam perceber tão rápido que eu realmente amo essa mulher, o jeito que ela anda, reclama do vento e arruma o cabelo, a forma com que ela sempre consegue se sujar ou ser desastrada, a sutileza e tranquilidade no olhar dela, acho que realmente você tem um poder de me deixar apaixonado por você.",
        frase: "Aquele lugar era lindo, mas a única coisa que eu conseguia prestar atenção era você."
    },
    {
        src: "img/btnSecreto/outback.jpeg",
        caption: "Sempre me assusta o quanto eu fico calmo e tranquilo quando estou com você, mesmo num dia super cheio, estressante pra krl, super cansativo, aprece que quando você aparece na minha frente, tudo fica tranquilo, todos os problemas simplesmente desaparecem, é uma parada surreal e que eu só consigo sentir com você.",
        frase: "Realmente a comida fica mais gostoa quando eu estou com a minha mulher."
    },
    {
        src: "img/btnSecreto/socorrofest.jpeg",
        caption: "Sinceramente, eu nem tenho muito o que falar aqui, você simplismente aceitou ir comigo pra socorro fest numa segunda, sem sacanagem nenhuma, quando olhei pro seus olhos aquele dia, vi aquele sorriso, e percebi que você realmente estava lá por que simplismente queria e estava se divertindo, eu pesnei, é irmão, é ela, não pense em mais nada, apenas é ela.",
        frase: "LEVEI A LAÍS NA ROTA DOS CAVALOS NUMA SEGUNA-FEIRA PRA OUVIR PISEIRO E ELA FOI!!!"
    }
];

// Clona as memórias para controle interno
let memRestantes = [...memories];

// Dados das músicas
const musicas = [
    {
        nome: "Ariana Grande - The Way ft. Mac Miller",
        src: "musicas/Ariana Grande - The Way ft. Mac Miller.mp3"
    },
    {
        nome: "Allie X - That's So Us",
        src: "musicas/Allie X - That's So Us (Official Audio).mp3"
    },
    {
        nome: "MacDemarco - I Like Her",
        src: "musicas/20191009 I Like Her.mp3"
    }
];

let currentMusicIndex = 0;
let isFirstClick = true;

const memoryPhoto = document.getElementById("memory-photo");
const caption = document.getElementById("caption");
const frase = document.getElementById("frase");
const changePhotoButton = document.getElementById("change-photo-button");

const playButton = document.querySelector(".play-button");
const musicNameDisplay = document.querySelector(".music-bar span");
const trocaMusicaButton = document.querySelector(".troca-msc-button");
const musicBar = document.querySelector(".music-bar");

const audioPlayer = new Audio();
audioPlayer.loop = true;
audioPlayer.autoplay = false;

// Oculta tudo no início (exceto o botão)
window.addEventListener("DOMContentLoaded", () => {
    memoryPhoto.classList.add("hidden");
    caption.classList.add("hidden");
    frase.classList.add("hidden");
    musicBar.classList.add("hidden");
    trocaMusicaButton.classList.add("hidden");
});

// Função para mostrar memória aleatória sem repetição
function mostrarMemoriaAleatoria() {
    if (memRestantes.length === 0) {
        caption.textContent = "Te amo minha princesa ❤️";
        frase.textContent = "";
        memoryPhoto.src = "img/btnSecreto/coracao.jpeg"; // opcional: imagem de encerramento
        changePhotoButton.disabled = true;
        changePhotoButton.textContent = "Volte amanhã 🥹";
        return;
    }

    const randomIndex = Math.floor(Math.random() * memRestantes.length);
    const memory = memRestantes[randomIndex];

    memoryPhoto.src = memory.src;
    caption.textContent = memory.caption;
    frase.textContent = memory.frase;

    // Remove a memória exibida
    memRestantes.splice(randomIndex, 1);
}

// Evento do botão principal
changePhotoButton.addEventListener("click", () => {
    memoryPhoto.classList.remove("hidden");
    caption.classList.remove("hidden");
    frase.classList.remove("hidden");
    musicBar.classList.remove("hidden");
    trocaMusicaButton.classList.remove("hidden");

    mostrarMemoriaAleatoria();

    if (isFirstClick) {
        audioPlayer.src = musicas[currentMusicIndex].src;
        audioPlayer.play();
        musicNameDisplay.textContent = musicas[currentMusicIndex].nome;
        playButton.textContent = "⏸";
        isFirstClick = false;
    }

    changePhotoButton.textContent = "Próximo momento ❤️";
});

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
    audioPlayer.play();
    musicNameDisplay.textContent = musicas[currentMusicIndex].nome;
    playButton.textContent = "⏸";
});