const API = "http://localhost:8080/livros";


// ==========================
// CARREGAR LIVROS
// ==========================
async function carregarLivros() {

    try {

        const resposta = await fetch(
            `${API}/listartodos`
        );

        if (!resposta.ok) {

            throw new Error(
                "Erro ao carregar livros"
            );

        }

        const livros = await resposta.json();

        const tbody =
            document.querySelector("tbody");

        tbody.innerHTML = "";

        let total = livros.length;
        let disponiveis = 0;
        let emprestados = 0;
        let reservados = 0;

        livros.forEach(livro => {

            let statusTexto = "Disponível";
            let statusClasse = "available";

            if (livro.status === "emprestado") {

                statusTexto = "Emprestado";
                statusClasse = "borrowed";
                emprestados++;

            } else if (
                livro.status === "reservado"
            ) {

                statusTexto = "Reservado";
                statusClasse = "reserved";
                reservados++;

            } else {

                disponiveis++;

            }

            tbody.innerHTML += `

                <tr>

                    <td class="book-info">

                        <img src="
                            http://localhost:8080/uploads/${livro.imagem}
                        ">

                        <div>

                            <strong>
                                ${livro.titulo}
                            </strong>

                            <span>
                                Livro físico
                            </span>

                        </div>

                    </td>

                    <td>
                        ${livro.autor}
                    </td>

                    <td>
                        ${livro.genero}
                    </td>

                    <td>
                        ${livro.isbn}
                    </td>

                    <td>

                        <span class="
                            status ${statusClasse}
                        ">
                            ${statusTexto}
                        </span>

                    </td>

                    <td>

                        <div class="actions">

                            <button
                                class="btn-action edit"
                                onclick="
                                    editarLivro(
                                        ${livro.id}
                                    )
                                "
                            >

                                <i class="
                                    bi bi-pencil
                                "></i>

                            </button>

                            <button
                                class="btn-action delete"
                                onclick="
                                    deletarLivro(
                                        ${livro.id}
                                    )
                                "
                            >

                                <i class="
                                    bi bi-trash
                                "></i>

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });

        // CARDS
        document.querySelectorAll(
            ".info-card h3"
        )[0].innerText = total;

        document.querySelectorAll(
            ".info-card h3"
        )[1].innerText = disponiveis;

        document.querySelectorAll(
            ".info-card h3"
        )[2].innerText = emprestados;

        document.querySelectorAll(
            ".info-card h3"
        )[3].innerText = reservados;

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar acervo"
        );

    }

}


// ==========================
// DELETAR LIVRO
// ==========================
async function deletarLivro(id) {

    const confirmar = confirm(
        "Deseja deletar este livro?"
    );

    if (!confirmar) return;

    try {

        const resposta = await fetch(
            `${API}/deletar/${id}`,
            {
                method: "DELETE"
            }
        );

        if (resposta.ok) {

            alert(
                "Livro deletado!"
            );

            carregarLivros();

        } else {

            alert(
                "Erro ao deletar"
            );

        }

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro no servidor"
        );

    }

}


// ==========================
// EDITAR LIVRO
// ==========================
function editarLivro(id) {

    window.location.href =
        `editarlivro.html?id=${id}`;

}


// ==========================
// INICIAR
// ==========================
window.addEventListener(
    "DOMContentLoaded",
    carregarLivros
);