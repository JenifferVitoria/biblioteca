const API_BUSCAR_TODOS = "http://localhost:8000/Usuarios/listarTodos";
const API_SALVAR = "http://localhost:8000/Usuarios/salvar";
const API_BUSCAR_POR_ID = "http://localhost:8000/Usuarios/listarporId";
const API_ATUALIZAR = "http://localhost:8000/Usuarios/atualizar";
const API_DELETAR = "http://localhost:8000/Usuarios/deletar";

let editandoId = null;

// =========================
// LIMPAR FORMULÁRIO
// =========================
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

// =========================
// MODAL
// =========================
function abrirModal() {
const modal = new bootstrap.Modal(document.getElementById("usuarioModal"));
modal.show();
}

function fecharModal() {
const modal = bootstrap.Modal.getInstance(document.getElementById("usuarioModal"));
if (modal) modal.hide();
}

// =========================
// LISTAR TODOS
// =========================
async function listarTodos() {

try {

    const response = await fetch(API_BUSCAR_TODOS);

    const usuarios = await response.json();

    const tbody = document.getElementById("usuarios");

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
                <button class="btn btn-warning btn-sm" onclick="editar(${usuario.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deletar(${usuario.id})">Deletar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

} catch (erro) {
    console.error(erro);
}
}

// =========================
// VALIDAÇÃO
// =========================
function validarUsuario(usuario) {

if (!usuario.nome || !usuario.cpf || !usuario.email || !usuario.telefone || !usuario.senha) {
    alert("Preencha todos os campos obrigatórios.");
    return false;
}

if (!usuario.email.includes("@")) {
    alert("E-mail inválido.");
    return false;
}

if (usuario.cpf.length < 11) {
    alert("CPF inválido.");
    return false;
}

return true;
}

// =========================
// DUPLICIDADE
// =========================
async function verificarDuplicidade(usuario) {

if (editandoId) return true;

try {

    const emailResp = await fetch(`http://localhost:8000/Usuarios/verificar-email?email=${usuario.email}`);
    const cpfResp = await fetch(`http://localhost:8000/Usuarios/verificar-cpf?cpf=${usuario.cpf}`);

    const emailExiste = await emailResp.json();
    const cpfExiste = await cpfResp.json();

    if (emailExiste) {
        alert("E-mail já cadastrado.");
        return false;
    }

    if (cpfExiste) {
        alert("CPF já cadastrado.");
        return false;
    }

    return true;

} catch (erro) {
    console.error(erro);
    alert("Erro ao verificar duplicidade.");
    return false;
}
}

// =========================
// SALVAR (CREATE / UPDATE)
// =========================
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

// validações
if (!validarUsuario(usuario)) return;
if (!(await verificarDuplicidade(usuario))) return;

try {

    let response;

    if (editandoId) {

        response = await fetch(`${API_ATUALIZAR}/${editandoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

    } else {

        response = await fetch(API_SALVAR, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
    }

    if (!response.ok) {
        alert("Erro ao salvar usuário.");
        return;
    }

    fecharModal();
    limparFormulario();
    await listarTodos();

} catch (erro) {
    console.error(erro);
    alert("Erro de comunicação com servidor.");
}
}

// =========================
// DELETAR
// =========================
async function deletar(id) {

if (!confirm("Deseja realmente excluir?")) return;

try {

    const response = await fetch(`${API_DELETAR}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        alert("Erro ao deletar.");
        return;
    }

    await listarTodos();

} catch (erro) {
    console.error(erro);
    alert("Erro ao excluir.");
}
}

// =========================
// EDITAR
// =========================
async function editar(id) {

try {

    const response = await fetch(`${API_BUSCAR_POR_ID}/${id}`);

    const usuario = await response.json();

    editandoId = id;

    document.getElementById("nome").value = usuario.nome ?? "";
    document.getElementById("cpf").value = usuario.cpf ?? "";
    document.getElementById("email").value = usuario.email ?? "";
    document.getElementById("telefone").value = usuario.telefone ?? "";
    document.getElementById("endereco").value = usuario.endereco ?? "";
    document.getElementById("dataNascimento").value = usuario.dataNascimento ?? "";
    document.getElementById("tipo").value = usuario.tipo ?? "";
    document.getElementById("senha").value = usuario.senha ?? "";
    document.getElementById("status").value = String(usuario.status);

    abrirModal();

} 
catch (erro) {
    console.error(erro);
    alert("Erro ao carregar usuário.");
}
}

function salvarPerfil() {
    alert("Salvar perfil funcionando!");
}

function alterarSenha() {
    alert("Senha funcionando!");
}

function salvarPreferencias() {
    alert("Preferências funcionando!");
}

function salvarEmailRecuperacao() {
    const email = document.getElementById("novoEmail").value;
    alert("Email atualizado: " + email);
}

function encerrarSessao(btn) {

    const item = btn.closest(".list-group-item");

    if (item) {
        item.remove();
    }

    alert("Sessão encerrada com sucesso.");
}


function encerrarTodasSessoes() {

    const itens = document.querySelectorAll(".list-group-item");

    itens.forEach(item => {
        item.remove();
    });

    alert("Todas as sessões foram encerradas!");
}

function verSessoes() {
    alert(`
Sessões ativas:

• Chrome - Windows (Atual)
• Android - 2h atrás
• iPhone - 1 dia atrás
    `);
}


// =========================
// INICIALIZAÇÃO
// =========================
document.addEventListener("DOMContentLoaded", listarTodos);