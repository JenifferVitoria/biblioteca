/* ==========================================================
   sidebar.js — monta o menu lateral de acordo com o tipo de usuário
   Biblioteca Estante Mágica
   ========================================================== */

const MENU_BIBLIOTECARIO = [
    { href: "dashboard-bibliotecario.html", icone: "bi-grid-1x2-fill", label: "Painel" },
    { href: "acervo.html", icone: "bi-book-half", label: "Acervo" },
    { href: "cadastro-livro.html", icone: "bi-journal-plus", label: "Cadastrar Livro" },
    { href: "emprestimos.html", icone: "bi-arrow-left-right", label: "Empréstimos" },
    { href: "reservas.html", icone: "bi-bookmark-star", label: "Reservas" },
    { href: "controle-usuarios.html", icone: "bi-people-fill", label: "Usuários" },
    { href: "multas.html", icone: "bi-cash-coin", label: "Multas" },
];

const MENU_ALUNO = [
    { href: "dashboard-aluno.html", icone: "bi-grid-1x2-fill", label: "Painel" },
    { href: "acervo.html", icone: "bi-book-half", label: "Acervo" },
    { href: "minhas-locacoes.html", icone: "bi-journal-check", label: "Minhas Locações" },
];

function montarSidebar(paginaAtual) {
    const usuario = getUsuarioLogado();
    if (!usuario) return;

    const menu = usuario.tipo === "Bibliotecário" ? MENU_BIBLIOTECARIO : MENU_ALUNO;

    const itensHtml = menu.map(item => `
        <li>
            <a href="${item.href}" class="${item.href === paginaAtual ? "ativo" : ""}">
                <i class="bi ${item.icone}"></i> ${item.label}
            </a>
        </li>
    `).join("");

    const sidebarHtml = `
        <div class="sidebar-logo">
            <div class="icone"><i class="bi bi-book-fill"></i></div>
            <div class="texto">Estante Mágica<small>Biblioteca Digital</small></div>
        </div>
        <ul class="sidebar-menu">${itensHtml}</ul>
        <div class="sidebar-footer">
            <button class="sidebar-sair" onclick="logout()">
                <i class="bi bi-box-arrow-right"></i> Sair
            </button>
        </div>
    `;

    const sidebarEl = document.getElementById("sidebar");
    if (sidebarEl) sidebarEl.innerHTML = sidebarHtml;

    preencherNomeUsuario();
}

function alternarSidebarMobile() {
    document.getElementById("sidebar")?.classList.toggle("aberta");
    document.getElementById("sidebarOverlay")?.classList.toggle("aberta");
}
