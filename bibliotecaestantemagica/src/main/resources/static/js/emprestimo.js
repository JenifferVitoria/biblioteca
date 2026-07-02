const API_LISTAR = "http://localhost:8000/emprestimos/listartodos";
const API_SALVAR = "http://localhost:8000/emprestimos/salvar";
const API_ATUALIZAR = "http://localhost:8000/emprestimos/atualizar";
const API_DELETAR = "http://localhost:8000/emprestimos/deletar";
const API_DEVOLVER = "http://localhost:8000/emprestimos/devolver";
const API_RENOVAR = "http://localhost:8000/emprestimos/renovar";
const API_LIVROS = "http://localhost:8000/livros/listartodos";
const API_BUSCAR_RA = "http://localhost:8000/Usuarios/buscarra";
const API_BUSCAR_LIVRO = "http://localhost:8000/livros/BuscarPorTitulo";

let editandoId = null;
let livros = [];
let idUsuario = null;


function abrirModal(){
	const modal = new bootstrap.Modal(document.getElementById("emprestimoModal"));
	modal.show();
}

function fecharModal(){
	const modalElement = document.getElementById("emprestimoModal");
	const modal = bootstrap.Modal.getInstance(modalElement);
	modal.hide();
}


/// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    listarEmprestimos();
    carregarLivros();
});

/// LISTAR EMPRÉSTIMOS

async function listarEmprestimos() {

    const response = await fetch(API_LISTAR);
    const dados = await response.json();
	const tbody = document.getElementById("emprestimos");
    tbody.innerHTML = "";

    dados.forEach(dado => {

        tbody.innerHTML += `
            <tr>
                <td>${dado.usuario?.ra || ""}</td>
                <td>${dado.usuario?.nome || ""}</td>
                <td>${dado.livro?.titulo || ""}</td>
                <td>${dado.dataEmprestimo}</td>
                <td>${dado.status}</td>

                <td>
                    <button class="btn btn-success btn-sm" onclick="devolver(${dado.id})">
                        <i class="bi bi-arrow-return-left"></i>
                    </button>

                    <button class="btn btn-primary btn-sm" onclick="renovar(${dado.id})">
                        Renovar
                    </button>

                    <button class="btn btn-danger btn-sm" onclick="deletar(${dado.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

/// BUSCAR ALUNO POR RA

async function buscarAluno() {

    const ra = document.getElementById("raAluno").value;

    if (!ra) {
        alert("Digite o RA do aluno");
        return;
    }

    const response = await fetch(`${API_BUSCAR_RA}/${ra}`);

    if (!response.ok) {
        alert("Aluno não encontrado");
		document.getElementById("nomeAluno").value = "";
        idUsuario = null;
        return;
  }

    const aluno = await response.json();

    idUsuario = aluno.id;
	document.getElementById("nomeAluno").value = aluno.nome;
}


/// BUSCAR LIVRO

async function buscarLivro() {

    const titulo = document.getElementById("buscaLivro").value;

    const response = await fetch(`${API_BUSCAR_LIVRO}/${titulo}`);

    const livros = await response.json();

    const select = document.getElementById("livro");
    select.innerHTML = "";

    for (const i = 0; i < livros.length; i++) {
             
        const option = document.createElement("option");
        option.value = livros[i].id;
        option.text = livros[i].titulo;

        select.appendChild(option);
    }
}

/// CARREGAR LIVROS

async function carregarLivros() {

    const response = await fetch(API_LIVROS);
    livros= await response.json();

    const select = document.getElementById("livro");
    select.innerHTML = "";

    livros.forEach(livro => {
	select.innerHTML += `
      <option value="${livro.id}">
            ${livro.titulo}
      </option>
        `;
    });
}
 
/// SALVAR

async function salvarEmprestimo() {

	if (idUsuario == null) {
	    alert("Busque um aluno pelo RA antes de salvar.");
	    return;
	}

	const emprestimo = {};

	emprestimo.usuario = {
	    id: idUsuario
	};

	emprestimo.livro = {
	    id: Number(document.getElementById("livro").value)
	};

	emprestimo.dataEmprestimo = document.getElementById("dataEmprestimo").value;
	emprestimo.status = document.getElementById("status").value;

    const salvar = API_SALVAR;
    const metodo = "POST";

    if (editandoId != null) {

        salvar = `${API_ATUALIZAR}/${editandoId}`;
        metodo = "PUT";
    }

    const response = await fetch(salvar, {

        method: metodo,

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(emprestimo)
    });

    if (response.ok) {

        alert("Empréstimo salvo com sucesso!");

limparFormulario();
listarEmprestimos();

    } else {

        alert("Erro ao salvar empréstimo.");
    }
	
fecharModal();
await listarEmprestimos();
limparFormulario();	

}

/// DEVOLVER

async function devolver(id) {

    if (!confirm("Deseja devolver este livro?")) return;

    const response = await fetch(`${API_DEVOLVER}/${id}`, {
    method: "PUT"
 });

    if (response.ok) {

        alert("Livro devolvido!");

        listarEmprestimos();

    } else {

        alert("Erro ao devolver.");
    }
}

/// RENOVAR

async function renovar(id) {

    if (!confirm("Deseja renovar este empréstimo?")) return;

    const response = await fetch(`${API_RENOVAR}/${id}`, {
   method: "PUT"
});

    if (response.ok) {

        alert("Empréstimo renovado!");

        listarEmprestimos();

    } else {

        alert("Erro ao renovar.");
 }
}

/// DELETAR

async function deletar(id) {

    if (!confirm("Deseja excluir este empréstimo?")) return;

    await fetch(`${API_DELETAR}/${id}`, {
    method: "DELETE"
});

    listarEmprestimos();
}

/// LIMPAR

function limparFormulario() {

  editandoId = null;
  idUsuario = null;

    document.getElementById("raAluno").value = "";
  document.getElementById("nomeAluno").value = "";
  document.getElementById("buscaLivro").value = "";
  document.getElementById("livro").selectedIndex = 0;
  document.getElementById("dataEmprestimo").value = "";
  document.getElementById("status").value = "Em andamento";
}