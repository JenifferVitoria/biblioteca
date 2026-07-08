
// COMEÇANDO O METODO LISTAR TODOS DOS (LIVROS)

const API_BUSCAR_TODOS = "http://localhost:8000/reservas/listartodos";
const API_BUSCAR_POR_ID = "http://localhost:8000/reservas/listarporid";
const API_ATUALIZAR = "http://localhost:8000/reservas/atualizar";
const API_DELETAR = "http://localhost:8000/reservas/deletar";
const API_SALVAR ="http://localhost:8000/reservas/salvar";

let editandoID = null;


async function listarLivrosCadastrados(){
	
	const response = await fetch (API_BUSCAR_TODOS);
	const reservas = await response.json();
	const tbody = document.getElementById("tabelaReservas");
	tbody.innerHTML="";
	
	console.log('Resposta')
	console.log(response);
	console.log('JSON')
	console.log(reservas);
	
	


reservas.forEach(reservas => {

const tr = document.createElement("tr");

tr.innerHTML = `

<td>${reservas.livro}</td>

<td>${reservas.autor}</td>

<td>${reservas.dataDaReserva}</td>

<td>${reservas.status}</td>


<td class="text-center">

<button class="btn btn-success btn-sm"
        onclick="AbrirPagina(${reservas.id})">

    <i class="bi bi-journal-check"></i>
    Realizar Empréstimo

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
	
	listarLivrosCadastrados();
});



function AbrirPagina(id){
     window.location.href = "emprestimos.html?id=" + id;
}






document.addEventListener("DOMContentLoaded", () => {
    listarLivrosCadastrados();
});
