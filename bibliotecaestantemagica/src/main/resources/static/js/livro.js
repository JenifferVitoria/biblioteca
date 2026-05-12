// COMEÇANDO O METODO LISTAR TODOS DOS (LIVROS)

const API_BUSCAR_TODOS = "http://localhost:8000/livros/listartodos";
const API_BUSCAR_POR_ID = "http://localhost:8000/livros/listarid";



// SERÁ UM METODO LISTAR TODOS, LISTAR POR ID E DELETAR PARA:
//titulo
//autor
//editora
//anoPublicacao
//isbn (Codigo do livro)
//genero
//codigoAcervo

//Estado para controle de edição
let editandoId = null;

//Pegando dados do HTML do livro.html
//Utilitários
function limparFormulario(){
	
	document.getElementById("Título").value = "";
	document.getElementById("Autor").value = "";
	document.getElementById("Editora").value = "";
	document.getElementById("Ano de publicação").value = "";
	document.getElementById("ISBN").value = "";
	document.getElementById("Gênero").value = "";
	document.getElementById("Código do acervo").value = "";
	editandoId = null;
	
}

// Pegando o modal do HTML

//AbrindoModal
function abrirModal(){
	
	const modal = new bootstrap.Modal(document.getElementById("modalLivro"));
	modal.show();
	
}

//FechandoModal
function fecharModal(){
	
	const modalElement = document.getElementById("modalLivro");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}

async function listarLivros(){
	
	//constante que armazena a resposta da nossa api
	const response = await fetch (API_BUSCAR_TODOS);
	//constante que armazena a conversao da resposta em formato json
	const livros = await response.json();
	
	//recuperando o tbody onde será criado as linhas
	const tbody = document.querySelector("tbody");
	tbody.innerHTML = "";
	
	livros.forEach(livro =>{
		
		//criando a linha
		const tr = document.createElement("tr");
		tr.innerHTML=`
		<td>${livro.id}</td>
		<td>${livro.titulo}</td>
		<td>${livro.autor}</td>
		<td>${livro.editora}</td>
    	<td>${livro.anoPublicacao}</td>
		<td>${livro.isbn}</td>
		<td>${livro.genero}</td>
		<td>${livro.codigoAcervo}</td>
		<td>
		  <button class="btn btn-warning btn-sm" onclick"editar(${livro.id})">
		  Editar
		  </button>
		  <button class="bnt btn-danger btn-sm" onclick="deletar(${livro.id})">
		  Deletar
		  </button>
		  </td>
		  
		 `;
		 
		 tbody.appendChild(tr);
	});
		
}

//inicialização
document.addEventListener("DOMContentLoaded",()=>{
	
	listarLivros();
});

//fim da listartodos