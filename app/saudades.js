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