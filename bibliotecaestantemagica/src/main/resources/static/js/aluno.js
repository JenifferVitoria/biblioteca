const API_LIVROS =
    "http://localhost:8080/livros";

const API_ALUNOS =
    "http://localhost:8080/usuarios";


// =====================================
// CARREGAR DASHBOARD
// =====================================
async function carregarDashboard() {

    try {

        // BUSCAR LIVROS
        const respostaLivros =
            await fetch(
                `${API_LIVROS}/listartodos`
            );

        const livros =
            await respostaLivros.json();

        // MOSTRAR LIVROS
        carregarLivrosDestaque(
            livros
        );

        // MOSTRAR TOTAL LIVROS
        atualizarTotalLivros(
            livros
        );

        // EMPRÉSTIMOS
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

    livros.slice(0, 4).forEach(
        livro => {

            container.innerHTML += `

                <div class="book-card">

                    <img src="
                        http://localhost:8080/uploads/${livro.imagem}
                    ">

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
                        ★★★★★ 4.8
                    </div>

                </div>

            `;

        }
    );

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

    // TOTAL LIVROS
    cards[3].innerText =
        livros.length;

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
                livro.status ===
                "emprestado"
        );

    const itens =
        container.querySelectorAll(
            ".emprestimo-item"
        );

    itens.forEach(item => {

        item.remove();

    });

    emprestimos.slice(0, 2).forEach(
        livro => {

            container.innerHTML += `

                <div class="emprestimo-item">

                    <img src="
                        http://localhost:8080/uploads/${livro.imagem}
                    ">

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

        }
    );

    // TOTAL EMPRÉSTIMOS
    const cards =
        document.querySelectorAll(
            ".info-card h2"
        );

    cards[1].innerText =
        emprestimos.length;

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

    botao.addEventListener(
        "click",
        async () => {

            const texto =
                input.value.toLowerCase();

            const resposta =
                await fetch(
                    `${API_LIVROS}/listartodos`
                );

            const livros =
                await resposta.json();

            const filtrados =
                livros.filter(livro =>

                    livro.titulo
                        .toLowerCase()
                        .includes(texto)

                    ||

                    livro.autor
                        .toLowerCase()
                        .includes(texto)

                    ||

                    livro.isbn
                        .includes(texto)

                );

            carregarLivrosDestaque(
                filtrados
            );

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
// INICIAR
// =====================================
window.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarDashboard();

        buscarLivros();

        ativarMenu();

        logout();

    }
);