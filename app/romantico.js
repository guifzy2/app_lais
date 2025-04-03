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
