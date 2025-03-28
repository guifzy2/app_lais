document.addEventListener("DOMContentLoaded", function () {
    const recordList = document.getElementById("record-list");
    const addRecordButton = document.getElementById("add-record-button");
    const recordTitleInput = document.getElementById("record-title");
    const recordHolderInput = document.getElementById("record-holder");

    // Carregar recordes salvos no localStorage
    const records = JSON.parse(localStorage.getItem("records")) || [
        { title: "O mais foda, sigma, dna lobsomen, folósofo e catedrático", holder: "Guilherme" },
        { title: "A mulher mais bonita que os olhos do Guilherme já viram", holder: "Láis" },
        { title: "O maior odiador de loiras do cerrado", holder: "Guilherme" }
    ];

    function saveRecords() {
        localStorage.setItem("records", JSON.stringify(records));
    }

    function renderRecords() {
        recordList.innerHTML = "";
        records.forEach((record, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${record.title}:</strong> ${record.holder} 
                            <button class="delete-record" data-index="${index}">❌</button>`;
            recordList.appendChild(li);
        });

        // Adiciona funcionalidade para excluir recordes
        document.querySelectorAll(".delete-record").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                records.splice(index, 1);
                saveRecords();
                renderRecords();
            });
        });
    }

    addRecordButton.addEventListener("click", function () {
        const title = recordTitleInput.value.trim();
        const holder = recordHolderInput.value.trim();

        if (title && holder) {
            records.push({ title, holder });
            saveRecords();
            renderRecords();
            recordTitleInput.value = "";
            recordHolderInput.value = "";
        }
    });

    renderRecords();
});
