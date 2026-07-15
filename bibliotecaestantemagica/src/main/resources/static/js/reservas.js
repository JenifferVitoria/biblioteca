
// COMEÇANDO O METODO LISTAR TODOS DOS (LIVROS)
const API_BASE2 = "http://localhost:8000";
const API_BUSCAR_TODOS = API_BASE2+"/reservas/listartodos";
const API_BUSCAR_POR_ID = API_BASE2+"/reservas/listarporid";
const API_ATUALIZAR = API_BASE2+"/reservas/atualizar";
const API_DELETAR = API_BASE2+"/reservas/deletar";
const API_SALVAR =API_BASE2+"/reservas/salvar";

const API_SALVAR_emprestimo = API_BASE2+"/emprestimos/salvar";


async function AbrirPagina(id){

		const emprestimo = {};

		emprestimo.usuario = {
		    id: Number(id)
		};

		emprestimo.livro = {
		    id: Number(id)
		};

		emprestimo.dataEmprestimo = new Date();
		emprestimo.status = "ATIVO";

	    const salvar = API_SALVAR_emprestimo;
	    const metodo = "POST";

	 

	    const response = await fetch(salvar, {

	        method: metodo,

	        headers: {
	            "Content-Type": "application/json"
	        },

	        body: JSON.stringify(emprestimo)
	    });

	    if (response.ok) {

	        alert("Empréstimo salvo com sucesso!");

			window.location.href ="emprestimos.html";

	    } else {

	        alert("Erro ao salvar empréstimo.");
	    }	
	
	

}



async function listarLivrosCadastrados(){
	console.log("passou aqui");
	const response = await fetch (API_BUSCAR_TODOS);
	const reservas = await response.json();
	const tbody = document.getElementById("tabelaReservas");
	tbody.innerHTML="";
	
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
		
		`; window.Location.href="livro.html";
		
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









document.addEventListener("DOMContentLoaded", () => {
    listarLivrosCadastrados();
});
