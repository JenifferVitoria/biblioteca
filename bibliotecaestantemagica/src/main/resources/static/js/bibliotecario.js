const API_LIVROS =
    "http://localhost:8080/livros";

const API_USUARIOS =
    "http://localhost:8080/alunos";


// ======================================
// CARREGAR DASHBOARD
// ======================================
async function carregarDashboard() {

    try {

        // LIVROS
        const respostaLivros =
            await fetch(
                `${API_LIVROS}/listartodos`
            );

        const livros =
            await respostaLivros.json();

        // USUÁRIOS
        const respostaUsuarios =
            await fetch(
                `${API_USUARIOS}/listartodos`
            );

        const usuarios =
            await respostaUsuarios.json();

        // CONTADORES
        let totalLivros =
            livros.length;

        let emprestados = 0;
        let reservados = 0;
        let disponiveis = 0;

        livros.forEach(livro => {

            if (
                livro.status === "emprestado"
            ) {

                emprestados++;

            } else if (
                livro.status === "reservado"
            ) {

                reservados++;

            } else {

                disponiveis++;

            }

        });

        // CARDS
        const cards =
            document.querySelectorAll(
                ".stats-card h2"
            );

        cards[0].innerText =
            totalLivros;

        cards[1].innerText =
            emprestados;

        cards[2].innerText =
            "8";

        cards[3].innerText =
            reservados;

        cards[4].innerText =
            "7";

        cards[5].innerText =
            usuarios.length;

        // CARREGAR EMPRÉSTIMOS
        carregarEmprestimos(livros);

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar dashboard"
        );

    }

}


// ======================================
// CARREGAR EMPRÉSTIMOS
// ======================================
function carregarEmprestimos(livros) {

    const container =
        document.querySelector(
            ".custom-card"
        );

    const emprestados =
        livros.filter(
            livro =>
                livro.status ===
                "emprestado"
        );

    if (emprestados.length === 0) {

        return;

    }

    const itens =
        container.querySelectorAll(
            ".emprestimo-item"
        );

    itens.forEach(item => {

        item.remove();

    });

    emprestados.forEach(livro => {

        container.innerHTML += `

            <div class="emprestimo-item">

                <img src="
                    http://localhost:8080/uploads/${livro.imagem}
                ">

                <div class="emprestimo-info">

                    <h5>
                        ${livro.titulo}
                    </h5>

                    <p>
                        ${livro.autor}
                    </p>

                    <span>
                        Usuário:
                        ${livro.usuario || "Não informado"}
                    </span>

                </div>

                <div class="emprestimo-data">

                    <small>
                        Devolver até:
                    </small>

                    <strong>
                        ${livro.dataDevolucao || "--"}
                    </strong>

                </div>

            </div>

        `;

    });

}


// ======================================
// BUSCAR LIVRO
// ======================================
function buscarLivro() {

    const busca =
        document.querySelector(
            ".search-box input"
        );

    busca.addEventListener(
        "keyup",
        async () => {

            const texto =
                busca.value.toLowerCase();

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

            console.log(filtrados);

        }
    );

}


// ======================================
// MENU
// ======================================
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


// ======================================
// LOGOUT
// ======================================
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


// ======================================
// INICIAR
// ======================================
window.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarDashboard();

        buscarLivro();

        ativarMenu();

        logout();

    }
);