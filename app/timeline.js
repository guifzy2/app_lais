document.addEventListener("DOMContentLoaded", function () {
    const openMonthsButton = document.getElementById("open-months-button");
    const monthDropdown = document.getElementById("month-dropdown");
    const monthButtons = document.querySelectorAll(".month-button");
    const eventList = document.getElementById("event-list");
    const selectedMonthTitle = document.getElementById("selected-month-title");

    // Eventos pré-definidos para os meses (Fevereiro e Março)
    const events = {
        2: [ // Fevereiro
            { date: "14/02/2024", description: "Amassei na primeira mensagem pra princesa", image: "img/lais1.jpeg" },
            { date: "21/02/2024", description: "Laís falando que eu tremi no primeiro encontro kk", image: "" },
            { date: "28/02/2024", description: "Laís prdeu a calota do caro KKKKKKKKKKKKKKKKKKKKK", image: "" }
        ],
        3: [ // Março
            { date: "01/03/2024", description: "Primeira vez que saimos e fomos pro marcinho ❤", image: "img/primeiro_enc.jpeg" },
            { date: "15/03/2024", description: "Laís descobriu que nem todo lugar com sinuca só tem favelado", image: "img/sinuca.jpeg" },
            { date: "21/03/2024", description: "Primeiro filme que vi com a mulher mais bonita do mundo", image: "img/filme.jpeg" },
            { date: "23/03/2024", description: "Pelo incrível que pareça, Laís conheçeu minha mãe", image: "img/lais_mae.jpeg" }
        ]
    };

    // Alternar exibição do menu suspenso ao clicar no botão
    openMonthsButton.addEventListener("click", () => {
        monthDropdown.classList.toggle("hidden");
    });

    // Função para carregar os eventos do mês selecionado
    function loadEvents(month) {
        eventList.innerHTML = ""; // Limpa os eventos anteriores

        // Atualiza o título do mês selecionado
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        selectedMonthTitle.textContent = `Eventos de ${monthNames[month - 1]}`;

        if (events[month]) {
            events[month].forEach(event => {
                const eventElement = document.createElement("li");
                eventElement.classList.add("event-item");

                eventElement.innerHTML = `
                    <img src="${event.image}" alt="Sem foto pra esse acontecimento" class="event-image">
                    <div class="event-details">
                        <p class="event-date">${event.date}</p>
                        <p class="event-description">${event.description}</p>
                    </div>
                `;

                eventList.appendChild(eventElement);
            });
        } else {
            eventList.innerHTML = "<p class='no-events'>Nenhum evento registrado para este mês.</p>";
        }
    }

    // Selecionar mês e carregar eventos
    monthButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remover seleção de outros meses
            monthButtons.forEach(btn => btn.classList.remove("selected"));
            // Marcar o mês atual como selecionado
            this.classList.add("selected");
            // Fechar o menu suspenso
            monthDropdown.classList.add("hidden");

            // Obter o número do mês clicado e carregar os eventos
            const selectedMonth = parseInt(this.getAttribute("data-month"));
            loadEvents(selectedMonth);
        });
    });

    // Carrega os eventos do mês de Fevereiro por padrão ao abrir a página
    loadEvents(2);
});
