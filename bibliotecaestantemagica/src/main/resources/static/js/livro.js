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
