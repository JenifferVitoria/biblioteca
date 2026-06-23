
window.onload = function () {

    // =========================================
    // ELEMENTOS
    // =========================================

    const btnReservar = document.getElementById("btnReservar");

    const resultado = document.getElementById("resultado");

    const btnLista = document.querySelector(".btn-lista");

    const btnAvaliacoes = document.querySelector(".btn-avaliacoes");

    const btnSair = document.querySelector(".btn-sair");

    const tituloLivro = document.querySelector(".book-details h1");

    const autorLivro = document.querySelector(".book-details h3");

    const notaLivro = document.querySelector(".nota");

    // =========================================
    // STATUS DO LIVRO
    // =========================================

    let disponivel = true;

    // =========================================
    // VERIFICAR DISPONIBILIDADE
    // =========================================

    window.verificarLivro = function () {

        const availabilityBox =
            document.querySelector(".availability-box");

        availabilityBox.innerHTML = "";

        const div = document.createElement("div");

        div.classList.add("text-center");

        if (disponivel) {

            div.innerHTML = `
                <h4 class="text-success">
                    <i class="bi bi-check-circle-fill"></i>
                    Disponível
                </h4>

                <p>
                    O livro está disponível para empréstimo.
                </p>
            `;

        } else {

            div.innerHTML = `
                <h4 class="text-danger">
                    <i class="bi bi-x-circle-fill"></i>
                    Indisponível
                </h4>

                <p>
                    Este livro já está reservado.
                </p>
            `;

        }

        availabilityBox.appendChild(div);

    };

    // =========================================
    // RESERVAR LIVRO
    // =========================================

    window.reservarLivro = function () {

        if (!disponivel) {

            resultado.innerHTML = `
                <span class="text-danger fw-bold">
                    Livro indisponível.
                </span>
            `;

            return;

        }

        disponivel = false;

        resultado.innerHTML = `
            <span class="text-success fw-bold">
                Livro reservado com sucesso!
            </span>
        `;

        btnReservar.disabled = true;

        btnReservar.innerHTML = `
            <i class="bi bi-check-circle"></i>
            Reservado
        `;

        btnReservar.classList.remove("btn-reservar");

        btnReservar.classList.add("btn-success");

    };

    // =========================================
    // ADICIONAR À LISTA
    // =========================================

    btnLista.addEventListener("click", function () {

        alert(
            `O livro "${tituloLivro.innerText}" foi adicionado à sua lista!`
        );

    });

    // =========================================
    // VER TODAS AVALIAÇÕES
    // =========================================

    btnAvaliacoes.addEventListener("click", function () {

        alert(
            `Livro: ${tituloLivro.innerText}
Autor: ${autorLivro.innerText}
Nota: ${notaLivro.innerText}`
        );

    });

    // =========================================
    // BOTÃO SAIR
    // =========================================

    btnSair.addEventListener("click", function () {

        const confirmar = confirm(
            "Deseja realmente sair?"
        );

        if (confirmar) {

            alert("Saindo do sistema...");

            window.location.href = "login.html";

        }

    });

    // =========================================
    // MENU SIDEBAR
    // =========================================

    const menuItems =
        document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {

        item.addEventListener("mouseenter", function () {

            item.style.cursor = "pointer";

            item.style.opacity = "0.8";

        });

        item.addEventListener("mouseleave", function () {

            item.style.opacity = "1";

        });

        item.addEventListener("click", function () {

            alert(
                `Abrindo: ${item.innerText.trim()}`
            );

        });

    });

    // =========================================
    // ANIMAÇÃO CAPA
    // =========================================

    const capa =
        document.querySelector(".book-cover img");

    capa.addEventListener("mouseenter", function () {

        capa.style.transform = "scale(1.03)";

        capa.style.transition = "0.3s";

    });

    capa.addEventListener("mouseleave", function () {

        capa.style.transform = "scale(1)";

    });

};