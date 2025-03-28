document.addEventListener("DOMContentLoaded", function () {
    const manualList = document.getElementById("manual-list");
    const addManualButton = document.getElementById("add-manual-button");
    const manualTextInput = document.getElementById("manual-text");

    // Dicas pré-definidas no manual
    const manualItems = JSON.parse(localStorage.getItem("manual")) || [
        "Não acordar a príncesa de manhã no sabado",
        "Não fazer pacto por loiras",
        "Não esquecer de ser um príncipe",
        "Lembrar de alimenta-la",
    ];

    function saveManual() {
        localStorage.setItem("manual", JSON.stringify(manualItems));
    }

    function renderManual() {
        manualList.innerHTML = "";
        manualItems.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item} <button class="delete-manual" data-index="${index}">❌</button>`;
            manualList.appendChild(li);
        });

        // Adiciona funcionalidade para excluir dicas
        document.querySelectorAll(".delete-manual").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                manualItems.splice(index, 1);
                saveManual();
                renderManual();
            });
        });
    }

    addManualButton.addEventListener("click", function () {
        const newItem = manualTextInput.value.trim();

        if (newItem) {
            manualItems.push(newItem);
            saveManual();
            renderManual();
            manualTextInput.value = "";
        }
    });

    renderManual();
});
