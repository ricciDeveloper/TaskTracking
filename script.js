const btnAdicionar = document.getElementById("btnAdicionar");
const inputTarefa = document.getElementById("inputTarefa");
const listaTarefas = document.querySelector(".listaTarefas");
const tarefasConcluidas = document.querySelector(".tarefasConcluidas"); // nova div

function adicionarTarefa() {
  const tarefaNome = inputTarefa.value.trim();

  if (tarefaNome === "") {
    alert("Por favor, insira uma tarefa.");
    return;
  }

  const tarefaItem = document.createElement("div");
  tarefaItem.classList.add("tarefa");

  const paragrafo = document.createElement("p");
  paragrafo.textContent = tarefaNome;
  tarefaItem.appendChild(paragrafo);

  const btnRemover = document.createElement("button");
  btnRemover.classList.add("btnRemover");
  btnRemover.textContent = "🗑️";
  btnRemover.addEventListener("click", removerTarefa);
  tarefaItem.appendChild(btnRemover);

  const btnPlay = document.createElement("button");
  btnPlay.classList.add("play");
  btnPlay.textContent = "▶";
  tarefaItem.appendChild(btnPlay);

  const btnStop = document.createElement("button");
  btnStop.classList.add("stop");
  btnStop.textContent = "❌";
  tarefaItem.appendChild(btnStop);

  let timer = null;
  let segundos = 0;
  //Função para iniciar o cronômetro
  // e atualizar o texto do parágrafo
  function iniciarCronometro(event) {
    const tarefaNomeAtual = paragrafo.textContent.split(" - ")[0];
    if (timer !== null) return;

    timer = setInterval(() => {
      segundos++;
      const horas = Math.floor(segundos / 3600);
      const minutos = Math.floor((segundos % 3600) / 60);
      const segundosRestantes = segundos % 60;

      paragrafo.textContent = `${tarefaNomeAtual} - ${String(horas).padStart(
        2,
        "0"
      )}:${String(minutos).padStart(2, "0")}:${String(
        segundosRestantes
      ).padStart(2, "0")}`;
    }, 1000);
  }
  // Função para parar o cronômetro
  // e mover a tarefa para "tarefas concluídas"
  function pararCronometro() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;

      // Obter a data atual no formato dd/mm/yy
      const agora = new Date();
      const dia = String(agora.getDate()).padStart(2, "0");
      const mes = String(agora.getMonth() + 1).padStart(2, "0"); // meses começam do 0
      const ano = String(agora.getFullYear()).slice(-2); // pega os dois últimos dígitos do ano
      const dataFormatada = `${dia}/${mes}/${ano}`;

      // Atualiza o texto do parágrafo com a data de finalização
      const tarefaNomeAtual = paragrafo.textContent.split(" - ")[0];
      const horas = Math.floor(segundos / 3600);
      const minutos = Math.floor((segundos % 3600) / 60);
      const segundosRestantes = segundos % 60;
      const tempoFinal = `${String(horas).padStart(2, "0")}:${String(
        minutos
      ).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`;

      paragrafo.textContent = `${tarefaNomeAtual} - ${tempoFinal} - ${dataFormatada}`;

      // Mover tarefa para "tarefas concluídas"
      const tarefaFinalizada = tarefaItem.cloneNode(true); // clona a tarefa
      const btns = tarefaFinalizada.querySelectorAll("button");
      btns.forEach((btn) => btn.remove()); // remove os botões da tarefa concluída

      // Criar e adicionar o emoji ✔️ no canto direito
      const emojiCheck = document.createElement("span");
      emojiCheck.textContent = "✔️";
      emojiCheck.style.float = "right";
      emojiCheck.style.marginLeft = "10px";
      tarefaFinalizada.appendChild(emojiCheck);
      tarefasConcluidas.appendChild(tarefaFinalizada);
      //objeto de tarefa concluída
      const tarefaStorage = {
        nome: tarefaNomeAtual,
        tempo: tempoFinal,
        data: dataFormatada,
      };
      const tarefasSalvas =
        JSON.parse(localStorage.getItem("tarefasConcluidas")) || [];
      tarefasSalvas.push(tarefaStorage);
      localStorage.setItem("tarefasConcluidas", JSON.stringify(tarefasSalvas));
      tarefaItem.remove(); // remove da lista ativa
    }
  }

  btnPlay.addEventListener("click", iniciarCronometro);
  btnStop.addEventListener("click", pararCronometro);

  listaTarefas.appendChild(tarefaItem);
  inputTarefa.value = "";
}
function carregarTarefasConcluidas() {
  const tarefasSalvas =
    JSON.parse(localStorage.getItem("tarefasConcluidas")) || [];
  tarefasSalvas.forEach((tarefa) => {
    const tarefaFinalizada = document.createElement("div");
    tarefaFinalizada.classList.add("tarefa");
    const paragrafo = document.createElement("p");
    paragrafo.textContent = `${tarefa.nome} - ${tarefa.tempo} - ${tarefa.data}`;
    tarefaFinalizada.appendChild(paragrafo);

    const emojiCheck = document.createElement("span");
    emojiCheck.textContent = "✔️";
    emojiCheck.style.float = "right";
    emojiCheck.style.marginLeft = "10px";
    tarefaFinalizada.appendChild(emojiCheck);
    tarefasConcluidas.appendChild(tarefaFinalizada);
  });
}
function removerTarefa(event) {
  const tarefaItem = event.target.parentElement;
  tarefaItem.remove();
}
carregarTarefasConcluidas();
btnAdicionar.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});
