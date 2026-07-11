

// COMEÇANDO O METODO LISTAR TODOS DOS (LIVROS)

const API_BUSCAR_TODOS = "http://192.168.10.22:8011/livros/listartodos";
const API_BUSCAR_POR_ID = "http://192.168.10.22:8011/livros/listarid";
const API_SALVAR = "http://192.168.10.22:8011/livros/salvar";
const API_ATUALIZAR = "http://192.168.10.22:8011/livros/atualizar";

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
	
	document.getElementById("titulo").value = "";
	document.getElementById("autor").value = "";
	document.getElementById("editora").value = "";
	document.getElementById("anoPublicacao").value = "";
	document.getElementById("isbn").value = "";
	document.getElementById("genero").value = "";
	document.getElementById("codigoAcervo").value = "";
	editandoId = null;
	
}


// SALVAR
async function salvar(){

	const titulo = document.getElementById("titulo").value;
	const autor = document.getElementById("autor").value;
	const editora = document.getElementById("editora").value;
	const anoPublicacao = document.getElementById("anoPublicacao").value;
	const isbn = document.getElementById("isbn").value;
	const genero = document.getElementById("genero").value;
	const codigoAcervo = document.getElementById("codigoAcervo").value;

	const formData = new FormData();
	
	formData.append("titulo", titulo);
	formData.append("autor", autor);
	formData.append("editora", editora);
	formData.append("anoPublicacao", anoPublicacao);
	formData.append("isbn", isbn);
	formData.append("genero", genero);
	formData.append("codigoAcervo", codigoAcervo);
	formData.append("id", editandoId); // Adicionando o ID ao FormData para atualização


    if(editandoId){

		await fetch(`${API_ATUALIZAR}/${id}`, {

		        method: "PUT",

		        body: formData

		    });
			
			window.Location.href="acervo.html";
		
    } else {

	    await fetch(API_SALVAR, {
	
	        method: "POST",
	
	        body: formData
	
	    });

	}


   //coloque aqui o seu método para listar
   await listarTodosOsLivros();
   limparFormulario();
   
};
// FUNÇÃO CADASTROLIVRO PARA CAIR NA PAGINA LISTALIVRO
 async function listarTodosOsLivros(){
	
	//constante que armazena a resposta da nossa api
	const response = await fetch(API_BUSCAR_TODOS);
	//constante que armazena a conversão da resposta em formato json
	const livro =  await  response.json();
	const tbody = document.querySelector("tbody");
	tbody.innerHTML = "";
	livro.foreach(livros =>{
		const tr = document.createElement("tr");
		tr.innerHTML =`<td>${livro.id}</td>

		<td>${livro.titulo}</td>

		<td>${livro.autor}</td>

		<td>${livro.editora}</td>

		<td>${livro.anoPublicacao}</td>
		
		<td>${livro.isbn}</td>

		<td>${livro.genero}</td>
		
		<td>${livro.codigoAcervo}</td>
		<td>

		<button class="btn btn-warning btn-sm" onclick="editar(${livro.id})">

		Editar

		</button>

		<button class="btn btn-danger btn-sm" onclick="deletar(${livro.id})">

		Deletar

		</button>

		</td>
		
		`;
		tbody.appendChild(tr);
	});
	
 }
 
 document.addEventListener("DOMContentLoaded",()=>{
 	
 	listarTodosOsLivros();
 });

