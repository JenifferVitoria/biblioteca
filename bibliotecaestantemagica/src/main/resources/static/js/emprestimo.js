const API_BUSCAR_TODOS = "http://localhost:8000/emprestimos/listartodos";
const API_SALVAR = "http://localhost:8000/emprestimos/salvar";
const API_BUSCAR_POR_ID = "http://localhost:8000/emprestimos/listarid";
const API_ATUALIZAR = "http://localhost:8000/emprestimos/atualizar";
const API_DELETAR = "http://localhost:8000/emprestimos/deletar";

const API_USUARIOS = "http://localhost:8000/Usuarios/listarTodos";
const API_LIVROS = "http://localhost:8000/livros/listartodos";

let editandoId = null;

// ================= LIMPAR =================
function limparFormulario() {

    document.getElementById("locador").value = "";
    document.getElementById("locatario").value = "";
    document.getElementById("livro").value = "";
    document.getElementById("dataEmprestimo").value = "";
    document.getElementById("dataDevolucao").value = "";
    document.getElementById("status").value = "Em andamento";
 

    editandoId = null;
}

// ================= MODAL =================
function abrirModal() {
    new bootstrap.Modal(document.getElementById("emprestimoModal")).show();
}

// ================= LISTAR =================
async function listarTodos() {

    const res = await fetch(API_BUSCAR_TODOS);
    const data = await res.json();

    const tbody = document.getElementById("emprestimos");
    tbody.innerHTML = "";

    data.forEach(emprestimo => {

        tbody.innerHTML += `
            <tr>
                <td>${emprestimo.locador?.nome || ""}</td>
                <td>${emprestimo.locatario?.nome || ""}</td>
                <td>${emprestimo.livro?.titulo || ""}</td>
                <td>${emprestimo.dataEmprestimo}</td>
                <td>${emprestimo.dataDevolucao}</td>
                <td>${emprestimo.status}</td>

                <td>
                    <button class="btn btn-warning btn-sm" onclick="editar(${emprestimo.id})">
                        <i class="bi bi-pencil"></i>
                    </button>

                    <button class="btn btn-danger btn-sm" onclick="deletar(${emprestimo.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
}

// ================= USUÁRIOS =================
async function carregarUsuarios() {

    const res = await fetch(API_USUARIOS);
    const usuarios = await res.json();

    const locador = document.getElementById("locador");
    const locatario = document.getElementById("locatario");

    locador.innerHTML = "";
    locatario.innerHTML = "";

    usuarios.forEach(usuario => {

        locador.innerHTML += `<option value="${usuario.id}">${usuario.nome}</option>`;
        locatario.innerHTML += `<option value="${usuario.id}">${usuario.nome}</option>`;

    });
}

// ================= LIVROS =================
async function carregarLivros() {

    const res = await fetch(API_LIVROS);
    const livros = await res.json();

    const select = document.getElementById("livro");

    select.innerHTML = "";

    livros.forEach(livros => {
        select.innerHTML += `<option value="${livros.id}">${livros.titulo}</option>`;
    });
}

// ================= SALVAR =================
async function salvarEmprestimo() {

    const emprestimo = {

        locador: { id: Number(document.getElementById("locador").value) },
        locatario: { id: Number(document.getElementById("locatario").value) },
        livro: { id: Number(document.getElementById("livro").value) },

        dataEmprestimo: document.getElementById("dataEmprestimo").value,
        dataDevolucao: document.getElementById("dataDevolucao").value,
        status: document.getElementById("status").value,
    };

    let url = API_SALVAR;
    let method = "POST";

    if (editandoId) {
        url = `${API_ATUALIZAR}/${editandoId}`;
        method = "PUT";
    }

    await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emprestimo)
    });

    limparFormulario();
    listarTodos();
}

// ================= DELETAR =================
async function deletar(id) {

    if (!confirm("Deseja excluir?")) return;

    await fetch(`${API_DELETAR}/${id}`, { method: "DELETE" });

    listarTodos();
}

// ================= EDITAR =================
async function editar(id) {

    const res = await fetch(`${API_BUSCAR_POR_ID}/${id}`);
    const emprestimo = await res.json();

    editandoId = id;

    document.getElementById("locador").value = emprestimo.locador.id;
    document.getElementById("locatario").value = emprestimo.locatario.id;
    document.getElementById("livro").value = emprestimo.livro.id;

    document.getElementById("dataEmprestimo").value = emprestimo.dataEmprestimo;
    document.getElementById("dataDevolucao").value = emprestimo.dataDevolucao;
    document.getElementById("status").value = emprestimo.status;

    abrirModal();
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {

    listarTodos();
    carregarUsuarios();
    carregarLivros();
});