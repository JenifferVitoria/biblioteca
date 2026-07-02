const API_MULTAS_TODAS = "http://localhost:8080/multa/listartodos";
const API_EMPRESTIMOS_TODOS = "http://localhost:8080/emprestimo/listartodos";

const API_MULTA_PAGAR = "http://localhost:8080/pix/gerar";
const API_EMPRESTIMO_ATUALIZAR = "http://localhost:8080/emprestimo/atualizar";

let listaMultas = [];
let listaEmprestimos = [];

let editandoId = null;


// VOLTAR
function voltarPagina() {
    window.location.href = "dashboardaluno.html";
}


// LIMPAR FORMULARIO
function limparFormulario() {
    editandoId = null;
}


// ABRIR MODAL

function abrirModal(id) {
    const modal = new bootstrap.Modal(document.getElementById(id));
    modal.show();
}


// FECHAR MODAL 
function fecharModal(id) {
    const modalElement = document.getElementById(id);
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}


// INICIALIZAR
document.addEventListener("DOMContentLoaded", () => {
    listarMultas();
    listarEmprestimos();
});


// LISTAR MULTAS
async function listarMultas() {

    const response = await fetch(API_MULTAS_TODAS);
    listaMultas = await response.json();

    const tbody = document.getElementById("tabelaMultas");
    tbody.innerHTML = "";

    listaMultas.forEach((multa, index) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${multa.livro?.titulo || "N/A"}</td>
            <td>${multa.diasAtraso} dias</td>
            <td>R$ ${multa.valor}</td>
            <td>${multa.status}</td>
            <td>

                <button class="btn btn-primary btn-sm"
                    onclick="abrirMultaModal(${index})">

                    Ver

                </button>

                <button class="btn btn-success btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#pixModal"
                    onclick="gerarPix(${multa.valor})">

                    Pagar

                </button>

            </td>
        `;

        tbody.appendChild(tr);
    });
}


// LISTAR EMPRESTIMOS
async function listarEmprestimos() {

    const response = await fetch(API_EMPRESTIMOS_TODOS);
    listaEmprestimos = await response.json();
}


// ABRIR MODAL MULTA
function abrirMultaModal(lista) {

    const multa = listaMultas[lista];

    document.getElementById("modalLivroMulta").innerText = multa.livro?.titulo || "";
    document.getElementById("modalUsuarioMulta").innerText = multa.aluno?.nome || "";
    document.getElementById("modalDias").innerText = multa.diasAtraso || "";
    document.getElementById("modalValor").innerText = multa.valor || "";
    document.getElementById("modalStatusMulta").innerText = multa.status || "";

    abrirModal("multaModal");
}

// ABRIR MODAL EMPRESTIMO
function abrirEmprestimoModal(lista) {

    const emprestimo = listaEmprestimos[lista];

    document.getElementById("modalLivro").innerText = emprestimo.livro?.titulo || "";
    document.getElementById("modalAutor").innerText = emprestimo.livro?.autor || "";
    document.getElementById("modalUsuario").innerText = emprestimo.aluno?.nome || "";
    document.getElementById("modalData").innerText = emprestimo.dataEmprestimo || "";
    document.getElementById("modalStatus").innerText = emprestimo.status || "";

    abrirModal("emprestimoModal");
}


// PIX (GERAR CÓDIGO)
function gerarPix(valor) {

    const codigo = "PIX-" + Date.now();

    document.getElementById("pixCode").value = codigo;

    document.getElementById("imgPix").src =
        "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + codigo;
}

// COPIAR PIX

function copiarCodigo() {

    const input = document.getElementById("pixCode");

    input.select();
    input.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(input.value);

    alert("Código PIX copiado!");
}

// PAGAR MULTA

async function pagarMulta() {
		alert("Multa paga com sucesso!");

await fetch(`${API_MULTA_PAGAR}/${id}`, { method: "PUT" });

    fecharModal("multaModal");
    listarMultas();
}


// PAGAR EMPRESTIMO
async function pagarEmprestimo() {

    alert("Empréstimo atualizado!");

 await fetch(`${API_EMPRESTIMO_ATUALIZAR}/${id}`, { method: "PUT" });

    fecharModal("emprestimoModal");
    listarEmprestimos();
}