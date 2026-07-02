const API_LIVROS = "http://localhost:8011/livros";
const API_USUARIOS = "http://localhost:8011/usuarios";


// ==============================
// CARREGAR DASHBOARD
// ==============================
async function carregarDashboard() {

    const resposta = await fetch(`${API_LIVROS}/listartodos`);
    const livros = await resposta.json();

    mostrarLivros(livros);
    atualizarTotalLivros(livros);
    atualizarEmprestimos(livros);
}


// ==============================
// CARREGAR USUÁRIO
// ==============================
async function carregarUsuario() {

    const id = localStorage.getItem("usuarioId");

    if (!id) return;

    const resposta = await fetch(`${API_USUARIOS}/listarporid/${id}`);
    const usuario = await resposta.json();

    document.getElementById("nomeUsuario").innerText = usuario.nome;
    document.getElementById("tipoUsuario").innerText = usuario.tipo;
}


// ==============================
// MOSTRAR LIVROS
// ==============================
function mostrarLivros(livros) {

    const container = document.querySelector(".books-grid");

    container.innerHTML = "";

    livros.slice(0, 4).forEach(livro => {

        container.innerHTML += `
            <div class="book-card">
                <img src="http://localhost:8011/uploads/${livro.imagem}">
                <h5>${livro.titulo}</h5>
                <p>${livro.autor}</p>
                <span>${livro.genero}</span>
            </div>
        `;

    });

}


// ==============================
// TOTAL DE LIVROS
// ==============================
function atualizarTotalLivros(livros) {

    document.querySelectorAll(".info-card h2")[3].innerText =
        livros.length;
}


// ==============================
// EMPRÉSTIMOS
// ==============================
function atualizarEmprestimos(livros) {

    const emprestados = livros.filter(
        livro => livro.status === "EMPRESTADO"
    );

    document.querySelectorAll(".info-card h2")[1].innerText =
        emprestados.length;
}


// ==============================
// BUSCAR LIVROS
// ==============================
async function buscarLivros() {

    const texto = document.querySelector(".search-box input")
        .value.toLowerCase();

    const resposta = await fetch(`${API_LIVROS}/listartodos`);
    const livros = await resposta.json();

    const filtrados = livros.filter(livro =>
        livro.titulo.toLowerCase().includes(texto) ||
        livro.autor.toLowerCase().includes(texto)
    );

    mostrarLivros(filtrados);
}


// ==============================
// LOGOUT
// ==============================
function logout() {

    if (confirm("Deseja sair do sistema?")) {

        localStorage.clear();

        window.location.href = "login.html";
    }
}


// ==============================
// NOTIFICAÇÕES
// ==============================
function abrirNotificacoes() {

    alert("Você possui notificações.");
}


// ==============================
// LOCAÇÕES (MODAL DINÂMICO)
// ==============================

const locacoes = [
    {
        livro: "Pai Rico Pai Pobre",
        autor: "Robert Kiyosaki",
        locacao: "10/05/2024",
        devolucao: "24/05/2024"
    },
    {
        livro: "A Teoria do Saber",
        autor: "Jean Piaget",
        locacao: "12/05/2024",
        devolucao: "26/05/2024"
    },
    {
        livro: "Verity",
        autor: "Colleen Hoover",
        locacao: "15/05/2024",
        devolucao: "29/05/2024"
    }
];

function verLocacoes() {

    const lista = document.getElementById("listaLocacoes");

    lista.innerHTML = "";

    locacoes.forEach((item, index) => {

        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-start">

                <div class="ms-2 me-auto">

                    <div class="fw-bold">
                        ${item.livro}
                    </div>

                    <small>Autor: ${item.autor}</small><br>
                    <small>Locação: ${item.locacao}</small><br>
                    <small>Devolução: ${item.devolucao}</small>

                </div>

                <span class="badge bg-primary rounded-pill">
                    ${index + 1}
                </span>

            </li>
        `;
    });

    const modal = new bootstrap.Modal(
        document.getElementById("modalLocacoes")
    );

    modal.show();
}


// ==============================
// INICIAR PÁGINA
// ==============================
document.addEventListener("DOMContentLoaded", () => {

    carregarDashboard();
    carregarUsuario();

    document.querySelector(".btn-buscar")
        .addEventListener("click", buscarLivros);
});