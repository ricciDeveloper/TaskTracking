// Captura os elementos do DOM
const btnAdicionar = document.getElementById("btnAdicionar");
const inputTarefa = document.getElementById("inputTarefa");
const listaTarefas = document.querySelector(".listaTarefas"); // Usando querySelector para pegar o primeiro elemento com essa classe

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
      const tarefaNome = inputTarefa.value.trim(); // Captura o valor do input e remove espaços em branco

      if (tarefaNome === "") {
        alert("Por favor, insira uma tarefa."); // Alerta se o campo estiver vazio
        return;
      }

      // Cria o item da tarefa
      const tarefaItem = document.createElement('div');
      tarefaItem.classList.add('tarefa');

      // Cria o parágrafo com o nome da tarefa
      const paragrafo = document.createElement('p');
      paragrafo.textContent = tarefaNome;
      tarefaItem.appendChild(paragrafo);

      // Cria o botão de remover
      const btnRemover = document.createElement('button');
      btnRemover.classList.add('btnRemover');
      btnRemover.textContent = "";
      btnRemover.addEventListener("click", removerTarefa);
      tarefaItem.appendChild(btnRemover);

      // Cria o botão de play
      const btnPlay = document.createElement('button');
      btnPlay.classList.add('play');
      tarefaItem.appendChild(btnPlay);

      // Adiciona a tarefa à lista
      listaTarefas.appendChild(tarefaItem);

      // Limpa o campo de entrada
      inputTarefa.value = "";
}
function removerTarefa(event) {

      const tarefaItem = event.target.parentElement; // Captura o elemento pai do botão clicado
      tarefaItem.remove(); // Remove a tarefa da lista


}

// Evento para o botão "Adicionar"
    btnAdicionar.addEventListener("click", adicionarTarefa); // Adiciona um evento de clique ao botão "Adicionar"

// Permitir adicionar tarefas pressionando "Enter"
    inputTarefa.addEventListener("keypress", function(event) {
  
  
    if (event.key === "Enter") { // Verifica se a tecla pressionada é "Enter"
            adicionarTarefa(); // Chama a função para adicionar a tarefa
    }
});
