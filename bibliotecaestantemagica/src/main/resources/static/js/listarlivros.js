const API_BUSCAR_TODOS = "http://192.168.10.22:8011/livros/listartodos";
const API_BUSCAR = "http://192.168.10.22:8011/livros/buscar";

// LISTAR TODOS//

async function listarLivros() {

    console.log("Listando livros...");

    const response = await fetch(API_BUSCAR_TODOS);

    const livros = await response.json();

    preencherTabela(livros);

}


// BUSCAR LIVRO//



async function buscarLivro() {

   
	console.log("Buscando livro...");
	
    const valor = document.getElementById("perquisar").value;

    let response;

    if (valor != "") {

        response = await fetch(`${API_BUSCAR}/${valor}/${valor}/${valor}/${valor}`);

    } else {

        response = await fetch(API_BUSCAR_TODOS);

    }

    if (!response.ok) {
        console.error("Erro ao buscar livros.");
        return;
    }

    const livros = await response.json();
	
	window.Location.href="reserva.html";

    preencherTabela(livros);

}


// PREenchendo TABELA

function preencherTabela(livros) {

    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    livros.forEach(livro => {

        const tr = document.createElement("tr");

	
		
	let caminho = "/img/"+livro.imagem;
	console.log(caminho);
	console.log(livro);
	console.log("ID:", livro.id);
        tr.innerHTML = `
            <td>
                <img src="${caminho}" width="70" height="90">
            </td>

            <td>${livro.titulo}</td>

            <td>${livro.autor}</td>

            <td>${livro.genero}</td>

            <td>${livro.isbn}</td>

            <td>${livro.disponivel ? "Disponível" : "Emprestado"}</td>

            <td>
			
			<button class="btn-selecionar"
			        onclick="AbrirPagina(${livro.id})">
			    <i class="bi bi-check-circle-fill"></i>
			    Selecionar
			</button>
				
				

				
            </td>
        `;

        tbody.appendChild(tr);

    });

}





function AbrirPagina(id){
	window.location.href="livro.html?id="+id;
}


// CARREGA A TABELA//

listarLivros();



