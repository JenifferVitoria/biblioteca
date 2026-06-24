const API_BUSCAR_TODOS = "http://localhost:8000/Usuarios/listarTodos";
const API_SALVAR = "http://localhost:8000/Usuarios/salvar";
const API_BUSCAR_POR_ID = "http://localhost:8000/Usuarios/listarporId";
const API_ATUALIZAR = "http://localhost:8000/Usuarios/atualizar";
const API_DELETAR = "http://localhost:8000/Usuarios/deletar";


let editandoId = null;

function limparFormulario() {
document.getElementById("nome").value = "";
document.getElementById("cpf").value = "";
document.getElementById("email").value = "";
document.getElementById("telefone").value = "";
document.getElementById("endereco").value = "";
document.getElementById("dataNascimento").value = "";
document.getElementById("tipo").value = "";
document.getElementById("senha").value = "";
document.getElementById("status").value = "true";


editandoId = null;


}

function abrirModal() {
const modal = new bootstrap.Modal(
document.getElementById("usuarioModal")
);

modal.show();


}

function fecharModal() {
const modalElement = document.getElementById("usuarioModal");
const modal = bootstrap.Modal.getInstance(modalElement);


if (modal) {
    modal.hide();
}


}

async function listarTodos() {
try {

    const response = await fetch(API_BUSCAR_TODOS);

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    const usuarios = await response.json();

    console.log("Resposta API:", usuarios);

    if (!Array.isArray(usuarios)) {
        console.error("A API não retornou um array:", usuarios);
        return;
    }

    const tbody = document.getElementById("usuarios");

    if (!tbody) {
        console.error("Elemento #usuarios não encontrado");
        return;
    }

    tbody.innerHTML = "";

    usuarios.forEach(usuario => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${usuario.id ?? ""}</td>
            <td>${usuario.email ?? ""}</td>
            <td>${usuario.telefone ?? ""}</td>
            <td>${usuario.tipo ?? ""}</td>
            <td>${usuario.status ? "Ativo" : "Inativo"}</td>
            <td>
                <button
                    class="btn btn-warning btn-sm"
                    onclick="editar(${usuario.id})">
                    Editar
                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deletar(${usuario.id})">
                    Deletar
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });

} catch (erro) {
    console.error("Erro ao listar usuários:", erro);
}


}

document.addEventListener("DOMContentLoaded", () => {
listarTodos();
});

async function salvar() {


const usuario = {
    nome: document.getElementById("nome").value,
    cpf: document.getElementById("cpf").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    endereco: document.getElementById("endereco").value,
    dataNascimento: document.getElementById("dataNascimento").value,
    tipo: document.getElementById("tipo").value,
    senha: document.getElementById("senha").value,
    status: document.getElementById("status").value === "true"
};

if (
    !usuario.nome ||
    !usuario.cpf ||
    !usuario.email ||
    !usuario.telefone ||
    !usuario.senha
) {
    alert("Preencha todos os campos obrigatórios.");
    return;
}

console.log("Enviando:", usuario);

try {

    let response;

    if (editandoId) {

        response = await fetch(
            `${API_ATUALIZAR}/${editandoId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            }
        );

    } else {

        response = await fetch(
            API_SALVAR,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuario)
            }
        );
    }

    if (!response.ok) {

        const erro = await response.text();

        console.error("Erro retornado pela API:", erro);

        alert("Erro ao salvar usuário.");

        return;
    }

    fecharModal();
    limparFormulario();
    await listarTodos();

} catch (erro) {

    console.error("Erro ao salvar:", erro);

    alert("Erro ao comunicar com o servidor.");
}
}

async function deletar(id) {

if (!confirm("Deseja realmente excluir?")) {
    return;
}

try {

    const response = await fetch(
        `${API_DELETAR}/${id}`,
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error("Erro ao excluir usuário");
    }

    await listarTodos();

} catch (erro) {

    console.error("Erro ao excluir:", erro);

    alert("Erro ao excluir usuário.");
}

}

async function editar(id) {


try {

    const response = await fetch(
        `${API_BUSCAR_POR_ID}/${id}`
    );

    if (!response.ok) {
        throw new Error("Erro ao buscar usuário");
    }

    const usuarios = await response.json();

    editandoId = id;

    document.getElementById("nome").value = usuarios.nome ?? "";
    document.getElementById("cpf").value = usuarios.cpf ?? "";
    document.getElementById("email").value = usuarios.email ?? "";
    document.getElementById("telefone").value = usuarios.telefone ?? "";
    document.getElementById("endereco").value = usuarios.endereco ?? "";
    document.getElementById("dataNascimento").value = usuarios.dataNascimento ?? "";
    document.getElementById("tipo").value = usuarios.tipo ?? "";
    document.getElementById("senha").value = usuarios.senha ?? "";
    document.getElementById("status").value = String(usuarios.status);

    abrirModal();

} catch (erro) {

    console.error("Erro ao editar:", erro);

    alert("Erro ao carregar usuário.");
}
}