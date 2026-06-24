window.onload = function () {

    // =====================================
    // ELEMENTOS
    // =====================================

    const btnEditar = document.querySelectorAll(".edit");

    const btnExcluir = document.querySelectorAll(".delete");

    const logoutBtn = document.querySelector(".logout-btn");

    const notificationBtn =
        document.querySelector(".notification-btn");

    const menuLinks =
        document.querySelectorAll(".menu a");

    const livrosTabela =
        document.querySelector("tbody");

    // =====================================
    // EDITAR LIVRO
    // =====================================

    btnEditar.forEach((botao) => {

        botao.addEventListener("click", function () {

            const linha =
                botao.closest("tr");

            const titulo =
                linha.querySelector("strong");

            const autor =
                linha.children[1];

            const categoria =
                linha.children[2];

            const isbn =
                linha.children[3];

            const status =
                linha.querySelector(".status");

            // =========================
            // PROMPTS
            // =========================

            const novoTitulo = prompt(
                "Editar título:",
                titulo.innerText
            );

            if (novoTitulo !== null &&
                novoTitulo !== "") {

                titulo.innerText = novoTitulo;

            }

            const novoAutor = prompt(
                "Editar autor:",
                autor.innerText
            );

            if (novoAutor !== null &&
                novoAutor !== "") {

                autor.innerText = novoAutor;

            }

            const novaCategoria = prompt(
                "Editar categoria:",
                categoria.innerText
            );

            if (novaCategoria !== null &&
                novaCategoria !== "") {

                categoria.innerText = novaCategoria;

            }

            const novoISBN = prompt(
                "Editar ISBN:",
                isbn.innerText
            );

            if (novoISBN !== null &&
                novoISBN !== "") {

                isbn.innerText = novoISBN;

            }

            const novoStatus = prompt(
                "Editar status (Disponível, Emprestado ou Reservado):",
                status.innerText.trim()
            );

            if (novoStatus !== null &&
                novoStatus !== "") {

                status.innerText = novoStatus;

                // remover classes
                status.classList.remove(
                    "available",
                    "borrowed",
                    "reserved"
                );

                // adicionar classe correta
                if (
                    novoStatus.toLowerCase() ===
                    "disponível"
                ) {

                    status.classList.add(
                        "available"
                    );

                }

                else if (
                    novoStatus.toLowerCase() ===
                    "emprestado"
                ) {

                    status.classList.add(
                        "borrowed"
                    );

                }

                else {

                    status.classList.add(
                        "reserved"
                    );

                }

            }

            alert(
                "Livro atualizado com sucesso!"
            );

            atualizarCards();

        });

    });

    // =====================================
    // EXCLUIR LIVRO
    // =====================================

    btnExcluir.forEach((botao) => {

        botao.addEventListener("click", function () {

            const linha =
                botao.closest("tr");

            const nomeLivro =
                linha.querySelector("strong")
                    .innerText;

            const confirmar = confirm(
                `Deseja excluir "${nomeLivro}"?`
            );

            if (confirmar) {

                linha.remove();

                atualizarCards();

                alert(
                    "Livro removido com sucesso!"
                );

            }

        });

    });

    // =====================================
    // ATUALIZAR CARDS
    // =====================================

    function atualizarCards() {

        const linhas =
            livrosTabela.querySelectorAll("tr");

        let total = 0;

        let disponiveis = 0;

        let emprestados = 0;

        let reservados = 0;

        linhas.forEach((linha) => {

            total++;

            const status =
                linha.querySelector(".status")
                    .innerText
                    .trim()
                    .toLowerCase();

            if (status === "disponível") {

                disponiveis++;

            }

            else if (status === "emprestado") {

                emprestados++;

            }

            else {

                reservados++;

            }

        });

        const cards =
            document.querySelectorAll(
                ".info-card h3"
            );

        cards[0].innerText = total;
        cards[1].innerText = disponiveis;
        cards[2].innerText = emprestados;
        cards[3].innerText = reservados;

    }

    // =====================================
    // NOTIFICAÇÃO
    // =====================================

    notificationBtn.addEventListener(
        "click",
        function () {

            alert(
                "Você possui 3 notificações."
            );

        }
    );

    // =====================================
    // MENU
    // =====================================

    menuLinks.forEach((link) => {

        link.addEventListener("mouseenter",
            function () {

                link.style.opacity = "0.8";

            });

        link.addEventListener("mouseleave",
            function () {

                link.style.opacity = "1";

            });

    });

    // =====================================
    // LOGOUT
    // =====================================

    logoutBtn.addEventListener("click",
        function (event) {

            event.preventDefault();

            const sair = confirm(
                "Deseja sair do sistema?"
            );

            if (sair) {

                alert(
                    "Saindo do sistema..."
                );

                window.location.href =
                    "login.html";

            }

        });

    // =====================================
    // ANIMAÇÃO DAS IMAGENS
    // =====================================

    const capas =
        document.querySelectorAll(
            ".book-info img"
        );

    capas.forEach((img) => {

        img.addEventListener("mouseenter",
            function () {

                img.style.transform =
                    "scale(1.08)";

                img.style.transition =
                    "0.3s";

            });

        img.addEventListener("mouseleave",
            function () {

                img.style.transform =
                    "scale(1)";

            });

    });

    // =====================================
    // INICIAR CARDS
    // =====================================

    atualizarCards();

};