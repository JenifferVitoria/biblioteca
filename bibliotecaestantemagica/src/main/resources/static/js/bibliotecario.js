const API_LIVROS = "http://localhost:8080/livros";
const API_ALUNOS = "http://localhost:8080/alunos";


async function carregarDashboard() {
    try {
        const livros = await fetch(API_LIVROS + "/listartodos").then(r => r.json());
        const alunos = await fetch(API_ALUNOS + "/listartodos").then(r => r.json());

        let totalLivros = livros.length;
        let emprestados = 0;
        let devolvidos = 0;
        let reservados = 0;
        let multas = 0;

        livros.forEach(livro => {
            let status = (livro.status || "").toLowerCase().trim();

            if (status === "emprestado") emprestados++;
            else if (status === "devolvido") devolvidos++;
            else if (status === "reservado") reservados++;

            if (livro.multa === true) multas++;
        });

        // Atualiza os cards (AJUSTE NO HTML: use IDs nesses elementos)
        setText("totalLivros", totalLivros);
        setText("emprestados", emprestados);
        setText("devolvidos", devolvidos);
        setText("reservados", reservados);
        setText("multas", multas);
        setText("alunos", alunos.length);

        carregarEmprestimos(livros);

    } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
    }
}

/* ================================
   LISTA DE EMPRÉSTIMOS
================================ */
function carregarEmprestimos(livros) {
    const lista = document.querySelector(".custom-card");

    if (!lista) {
        console.error("Elemento .custom-card não encontrado no HTML");
        return;
    }

    let html = "";

    livros.forEach(livro => {
        let status = (livro.status || "").toLowerCase().trim();

        if (status === "emprestado") {

            let imagem = livro.imagem
                ? `http://localhost:8080/uploads/${livro.imagem}`
                : "https://via.placeholder.com/80";

            html += `
                <div class="emprestimo-item">

                    <img src="${imagem}" alt="Livro">

                    <div class="emprestimo-info">
                        <h5>${livro.titulo || "Sem título"}</h5>
                        <p>${livro.autor || "Autor desconhecido"}</p>
                        <span>Usuário: ${livro.usuario || "N/A"}</span>
                    </div>

                    <div class="emprestimo-data">
                        <small>Devolver até:</small>
                        <strong>${livro.dataDevolucao || "-"}</strong>
                    </div>

                </div>
            `;
        }
    });

    lista.innerHTML = html;
}

/* ================================
   BUSCAR LIVRO
================================ */
async function buscarLivro() {
    try {
        let texto = prompt("Digite o título do livro");

        if (!texto) return;

        const livros = await fetch(API_LIVROS + "/listartodos").then(r => r.json());

        const encontrado = livros.find(l =>
            (l.titulo || "").toLowerCase() === texto.toLowerCase()
        );

        if (encontrado) {
            alert("Livro encontrado!");
        } else {
            alert("Livro não encontrado.");
        }

    } catch (error) {
        console.error("Erro ao buscar livro:", error);
    }
}

/* ================================
   MENU ATIVO
================================ */
function ativarMenu() {
    const menus = document.querySelectorAll(".menu-item");

    menus.forEach(menu => {
        menu.addEventListener("click", () => {

            menus.forEach(m => m.classList.remove("active"));
            menu.classList.add("active");

        });
    });
}

/* ================================
   LOGOUT
================================ */
function logout() {
    if (confirm("Deseja sair do sistema?")) {
        localStorage.clear();
        window.location.href = "login.html";
    }
}

/* ================================
   UTILITÁRIO
================================ */
function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

/* ================================
   INIT
================================ */
window.onload = function () {
    carregarDashboard();
    ativarMenu();
};