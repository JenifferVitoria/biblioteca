
// COMEÇANDO O METODO LISTAR TODOS DOS (LIVROS)

const API_BUSCAR_TODOS = "http://localhost:8000/reservas/listartodos";
const API_BUSCAR_POR_ID = "http://localhost:8000/reservas/listarporid";
const API_ATUALIZAR = "http://localhost:8000/reservas/atualizar";
const API_DELETAR = "http://localhost:8000/reservas/deletar";
const API_SALVAR ="http://localhost:8000/reservas/salvar";

let editandoID = null;


async function listarLivrosCadastrados(){
	
	const response = await fetch (API_BUSCAR_TODOS);
	const livro = await response.json();
	const tbody = document.getElementById("tabelaReservas");
	tbody.innerHTML="";
	
	console.log('Resposta')
	console.log(response);
	console.log('JSON')
	console.log(livro);
	
	


livro.forEach(livro => {

const tr = document.createElement("tr");

tr.innerHTML = `

<td>${livro.livro}</td>

<td>${livro.autor}</td>

<td>${livro.dataDaReserva}</td>

<td>${livro.status}</td>


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

function limparFormulario(){
	
	document.getElementById('livro').value = '';
	document.getElementById('autor').value = '';
	document.getElementById('dataDaReserva').value = '';
	document.getElementById('status').value = '';

	
	editandoID = null;
}


document.addEventListener("DOMContentLoaded",()=>{
	
	listarCarros();
});























document.addEventListener("DOMContentLoaded", () => {
    listarLivrosCadastrados();
});
