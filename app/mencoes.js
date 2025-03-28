document.addEventListener("DOMContentLoaded", function () {
    const salvarMencaoButton = document.getElementById("salvar-mencao");
    const limparMencoesButton = document.getElementById("limpar-mencoes");
    const comentarioInput = document.getElementById("comentario");
    const historicoMencoes = document.getElementById("historico-mencoes");
    const radioButtons = document.querySelectorAll("input[name='mencao']");
    
    // Garante que apenas um botão fique destacado
    radioButtons.forEach(radio => {
        radio.addEventListener("change", function () {
            // Nenhuma alteração necessária, pois a mudança de cor acontece via CSS automaticamente
        });
    });

    function carregarHistorico() {
        const mencoesSalvas = JSON.parse(localStorage.getItem("mencoes")) || [];
        historicoMencoes.innerHTML = "";
        mencoesSalvas.forEach((mencao, index) => {
            const li = document.createElement("li");
            li.textContent = `${mencao.data} - ${mencao.mencao}: ${mencao.comentario}`;

            const editButton = document.createElement("button");
            editButton.textContent = "Editar";
            editButton.classList.add("edit-button");
            editButton.addEventListener("click", () => editarMencao(index));

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => excluirMencao(index));

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            historicoMencoes.appendChild(li);
        });
    }

    function editarMencao(index) {
        const mencoesSalvas = JSON.parse(localStorage.getItem("mencoes")) || [];
        const mencaoSelecionada = mencoesSalvas[index];

        document.querySelector(`input[value="${mencaoSelecionada.mencao}"]`).checked = true;
        comentarioInput.value = mencaoSelecionada.comentario;

        excluirMencao(index);
    }

    function excluirMencao(index) {
        let mencoesSalvas = JSON.parse(localStorage.getItem("mencoes")) || [];
        mencoesSalvas.splice(index, 1);
        localStorage.setItem("mencoes", JSON.stringify(mencoesSalvas));
        carregarHistorico();
    }

    salvarMencaoButton.addEventListener("click", function () {
        const mencaoSelecionada = document.querySelector("input[name='mencao']:checked");
        if (!mencaoSelecionada) {
            alert("Escolha uma menção antes de salvar!");
            return;
        }

        const mencao = mencaoSelecionada.value;
        const comentario = comentarioInput.value;
        const dataAtual = new Date().toLocaleDateString("pt-BR");

        const mencoesSalvas = JSON.parse(localStorage.getItem("mencoes")) || [];
        mencoesSalvas.push({ data: dataAtual, mencao, comentario });
        localStorage.setItem("mencoes", JSON.stringify(mencoesSalvas));

        carregarHistorico();

        comentarioInput.value = "";
        mencaoSelecionada.checked = false;
    });

    limparMencoesButton.addEventListener("click", function () {
        if (confirm("Tem certeza que deseja apagar todas as menções?")) {
            localStorage.removeItem("mencoes");
            carregarHistorico();
        }
    });

    carregarHistorico();
});
