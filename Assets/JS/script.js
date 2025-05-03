// Captura os elementos do DOM
const btnAdicionar = document.getElementById("btnAdicionar");
const inputTarefa = document.getElementById("inputTarefa");
const listaTarefas = document.querySelector(".listaTarefas"); // Usando querySelector para pegar o primeiro elemento com essa classe

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
  const tarefaNome = inputTarefa.value.trim(); // Captura o valor do input e remove espaços em branco

  // Verifica se o campo de entrada não está vazio
  if (tarefaNome !== "") {
    // Cria um novo elemento de lista
    const tarefaItem = document.createElement('div');
    tarefaItem.classList.add('tarefa'); // Classe para estilizar
    tarefaItem.textContent = tarefaNome;
    
    // Adiciona a nova tarefa à lista
    listaTarefas.appendChild(tarefaItem);
    
    // Limpa o campo de entrada 
    inputTarefa.value = "";
  }
}

// Evento para o botão "Adicionar"
btnAdicionar.addEventListener("click", adicionarTarefa); // Adiciona um evento de clique ao botão "Adicionar"

// Permitir adicionar tarefas pressionando "Enter"
inputTarefa.addEventListener("keypress", function(event) {
  if (event.key === "Enter") { // Verifica se a tecla pressionada é "Enter"
    adicionarTarefa(); // Chama a função para adicionar a tarefa
  }
});
