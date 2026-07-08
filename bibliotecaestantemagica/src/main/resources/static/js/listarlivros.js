const API_BUSCAR_TODOS = "http://localhost:8000/livros/listartodos";
const API_BUSCAR_LIVRO = "http://localhost:8000/livros/BuscarPorTipo";

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

    const valor = document.getElementById("buscaLivro").value;

    let response;

    if (valor != "") {

        response = await fetch(`${API_BUSCAR_LIVRO}/${valor}/${valor}/${valor}/${valor}`);

    } else {

        response = await fetch(API_BUSCAR_TODOS);

    }

    const livros = await response.json();

    preencherTabela(livros);
	
	
}


// PREenchendo TABELA

function preencherTabela(livros) {

    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    livros.forEach(livro => {

        const tr = document.createElement("tr");

		console.log(livro.imagem);
		
		
        tr.innerHTML = `
            <td>
                <img src="${livro.imagem}" width="70" height="90">
            </td>

            <td>${livro.titulo}</td>

            <td>${livro.autor}</td>

            <td>${livro.genero}</td>

            <td>${livro.isbn}</td>

            <td>${livro.disponivel ? "Disponível" : "Emprestado"}</td>

            <td>
                <button class="btn btn-primary btn-sm"
                        onclick="buscar(${livro.id})">
                    Buscar
                </button>
				
				
				
            </td>
        `;

        tbody.appendChild(tr);

    });

}


// BUSCAR POR ID//

async function buscar(id) {

    console.log("Livro selecionado: " + id);

}


function AbrirPagina(id){
	window.location.href="emprestimos.html?id="+id;
}


// CARREGA A TABELA//

listarLivros();