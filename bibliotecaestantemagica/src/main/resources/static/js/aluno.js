const API_LIVROS =
    "http://localhost:8011/livros";

const API_ALUNOS =
    "http://localhost:8011/usuarios";


// =====================================
// CARREGAR DASHBOARD
// =====================================
async function carregarDashboard() {

    try {

        const respostaLivros =
            await fetch(
                `${API_LIVROS}/listartodos`
            );

        if (!respostaLivros.ok) {

            throw new Error(
                "Erro ao carregar livros"
            );

        }

        const livros =
            await respostaLivros.json();

        carregarLivrosDestaque(
            livros
        );

        atualizarTotalLivros(
            livros
        );

        carregarEmprestimos(
            livros
        );

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar dashboard"
        );

    }

}


// =====================================
// USUÁRIO LOGADO
// =====================================
async function carregarUsuario() {

    try {

        const id =
            localStorage.getItem(
                "usuarioId"
            );

        if (!id) {

            return;

        }

        const response =
            await fetch(
                `${API_ALUNOS}/listarporid/${id}`
            );

        if (!response.ok) {

            return;

        }

        const usuario =
            await response.json();

        const nome =
            document.getElementById(
                "nomeUsuario"
            );

        const tipo =
            document.getElementById(
                "tipoUsuario"
            );

        if (nome) {

            nome.innerText =
                usuario.nome;

        }

        if (tipo) {

            tipo.innerText =
                usuario.tipo;

        }

    } catch (erro) {

        console.error(
            "Erro ao carregar usuário",
            erro
        );

    }

}


// =====================================
// LIVROS DESTAQUE
// =====================================
function carregarLivrosDestaque(
    livros
) {

    const container =
        document.querySelector(
            ".books-grid"
        );

    container.innerHTML = "";

    livros
        .slice(0, 4)
        .forEach(livro => {

            container.innerHTML += `

                <div class="book-card">

                    <img
                        src="http://localhost:8011/uploads/${livro.imagem}"
                        alt="${livro.titulo}">

                    <h5>
                        ${livro.titulo}
                    </h5>

                    <p>
                        ${livro.autor}
                    </p>

                    <span>
                        ${livro.genero}
                    </span>

                    <div class="rating">
                        ★★★★★
                    </div>

                </div>

            `;

        });

}


// =====================================
// TOTAL LIVROS
// =====================================
function atualizarTotalLivros(
    livros
) {

    const cards =
        document.querySelectorAll(
            ".info-card h2"
        );

    if (cards.length > 3) {

        cards[3].innerText =
            livros.length;

    }

}


// =====================================
// EMPRÉSTIMOS
// =====================================
function carregarEmprestimos(
    livros
) {

    const container =
        document.querySelectorAll(
            ".custom-card"
        )[1];

    const emprestimos =
        livros.filter(
            livro =>

                livro.status &&
                livro.status.toUpperCase() ===
                "EMPRESTADO"
        );

    const itens =
        container.querySelectorAll(
            ".emprestimo-item"
        );

    itens.forEach(item => {

        item.remove();

    });

    emprestimos
        .slice(0, 2)
        .forEach(livro => {

            container.innerHTML += `

                <div class="emprestimo-item">

                    <img
                        src="http://localhost:8011/uploads/${livro.imagem}"
                        alt="${livro.titulo}">

                    <div>

                        <h5>
                            ${livro.titulo}
                        </h5>

                        <p>
                            ${livro.autor}
                        </p>

                        <span>
                            Data da locação:
                            ${livro.dataLocacao || "--"}
                        </span>

                    </div>

                    <strong>
                        ${livro.dataDevolucao || "--"}
                    </strong>

                </div>

            `;

        });

    const cards =
        document.querySelectorAll(
            ".info-card h2"
        );

    if (cards.length > 1) {

        cards[1].innerText =
            emprestimos.length;

    }

}


// =====================================
// BUSCAR LIVROS
// =====================================
function buscarLivros() {

    const botao =
        document.querySelector(
            ".btn-buscar"
        );

    const input =
        document.querySelector(
            ".search-box input"
        );

    if (!botao || !input) {

        return;

    }

    botao.addEventListener(
        "click",
        async () => {

            try {

                const texto =
                    input.value
                        .toLowerCase()
                        .trim();

                const resposta =
                    await fetch(
                        `${API_LIVROS}/listartodos`
                    );

                const livros =
                    await resposta.json();

                const filtrados =
                    livros.filter(
                        livro =>

                            livro.titulo
                                .toLowerCase()
                                .includes(texto)

                            ||

                            livro.autor
                                .toLowerCase()
                                .includes(texto)

                            ||

                            (
                                livro.isbn || ""
                            ).includes(texto)

                    );

                carregarLivrosDestaque(
                    filtrados
                );

            } catch (erro) {

                console.error(
                    erro
                );

            }

        }
    );

}


// =====================================
// MENU ATIVO
// =====================================
function ativarMenu() {

    const menus =
        document.querySelectorAll(
            ".menu-item"
        );

    menus.forEach(menu => {

        menu.addEventListener(
            "click",
            () => {

                menus.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });

                menu.classList.add(
                    "active"
                );

            }
        );

    });

}


// =====================================
// LOGOUT
// =====================================
function logout() {

    const botao =
        document.querySelector(
            ".btn-sair"
        );

    if (!botao) {

        return;

    }

    botao.addEventListener(
        "click",
        () => {

            const sair =
                confirm(
                    "Deseja sair?"
                );

            if (sair) {

                localStorage.clear();

                window.location.href =
                    "login.html";

            }

        }
    );

}


// =====================================
// VOLTAR
// =====================================
function voltarPagina() {

    window.history.back();

}


// =====================================
// INICIAR
// =====================================
window.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarDashboard();

        carregarUsuario();

        buscarLivros();

        ativarMenu();

        logout();

    }
);