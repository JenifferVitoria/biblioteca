const API = "http://localhost:8080/livros";


// ================================
// PEGAR ID DA URL
// ================================
function obterIdLivro() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("id");

}


// ================================
// CARREGAR LIVRO
// ================================
async function carregarLivro() {

    try {

        const id = obterIdLivro();

        const resposta = await fetch(
            `${API}/listarid/${id}`
        );

        if (!resposta.ok) {

            throw new Error(
                "Livro não encontrado"
            );

        }

        const livro =
            await resposta.json();

        // IMAGEM
        document.querySelector(
            ".book-image img"
        ).src =
            `http://localhost:8080/uploads/${livro.imagem}`;

        // CATEGORIA
        document.querySelector(
            ".category"
        ).innerText =
            livro.genero;

        // TÍTULO
        document.querySelector(
            ".book-details h2"
        ).innerText =
            livro.titulo;

        // AUTOR
        document.querySelector(
            ".book-details h4"
        ).innerText =
            livro.autor;

        // DESCRIÇÃO
        document.querySelector(
            ".description"
        ).innerText =
            livro.descricao || "Sem descrição";

        // ISBN
        document.querySelectorAll(
            ".info-item span"
        )[0].innerText =
            livro.isbn;

        // CATEGORIA
        document.querySelectorAll(
            ".info-item span"
        )[1].innerText =
            livro.genero;

        // IDIOMA
        document.querySelectorAll(
            ".info-item span"
        )[2].innerText =
            livro.idioma || "Português";

        // ANO
        document.querySelectorAll(
            ".info-item span"
        )[3].innerText =
            livro.anoPublicacao;

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar livro"
        );

    }

}


// ================================
// RESERVAR LIVRO
// ================================
async function reservarLivro() {

    try {

        const id = obterIdLivro();

        const resposta = await fetch(
            `${API}/reservar/${id}`,
            {
                method: "POST"
            }
        );

        const mensagem =
            await resposta.text();

        alert(mensagem);

        if (resposta.ok) {

            const botao =
                document.querySelector(
                    ".btn-reserve"
                );

            botao.disabled = true;

            botao.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                Reservado
            `;

        }

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao reservar livro"
        );

    }

}


// ================================
// BOTÃO RESERVAR
// ================================
document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarLivro();

        document.querySelector(
            ".btn-reserve"
        ).addEventListener(
            "click",
            reservarLivro
        );

    }
);