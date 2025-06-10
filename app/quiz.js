const quizData = [
  { q: "A Laís é:", options: ["a) linda", "b) muito linda", "c) surreal de linda", "d) incondicionalmente linda e perfeita"], correct: ["d"] },
  { q: "O Guilherme se interessou pela Laís principalmente por conta de ela ser/ter:", options: ["a) linda, apenas", "b) esquisita", "c) aura de mulher perigosa", "d) um humor quebrado"], correct: ["c"] },
  { q: "A cor favorita do Guilherme é:", options: ["a) a Laís", "b) azul", "c) verde", "d) roxo"], correct: ["a","b"] },
  { q: "Nosso primeiro beijo foi:", options: ["a) na casa do leo", "b) na quadra residencial", "c) na estradinha", "d) na frente da minha casa"], correct: ["d"] },
  { q: "Nosso terceiro encontro foi:", options: ["a) pontão", "b) casa do lucas", "c) ver filme", "d) casa do felipe"], correct: ["a"] },
  { q: "Qual o lugar favorito do Guilherme:", options: ["a) a casa dele", "b) a sua casa", "c) qualquer lugar com você", "d) você é muito linda puta merda"], correct: ["c","d"] }
];

function criarQuiz() {
  const form = document.getElementById("quizForm");
  quizData.forEach((item, i) => {
    const div = document.createElement("div");
    div.classList.add("question");
    const p = document.createElement("p");
    p.textContent = `${i+1}) ${item.q}`;
    div.appendChild(p);
    item.options.forEach(opt => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="q${i}" value="${opt[0]}"> ${opt}`;
      div.appendChild(label);
    });
    form.appendChild(div);
  });
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "Enviar";
  btn.classList.add("button");
  btn.addEventListener("click", verificar);
  form.appendChild(btn);
}

function verificar() {
  let acertos = 0;
  quizData.forEach((item, i) => {
    const sel = document.querySelector(`input[name=q${i}]:checked`);
    if (sel && item.correct.includes(sel.value)) acertos++;
  });
  mostrarResultado(acertos);
}

function mostrarResultado(acertos) {
  window.location.href = `quiz_respostas.html?acertos=${acertos}`;
}

criarQuiz();
