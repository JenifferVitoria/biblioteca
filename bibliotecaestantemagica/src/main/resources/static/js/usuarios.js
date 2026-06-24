// usuarios.js

window.onload = function () {

    // ==============================
    // BOTÕES EDITAR
    // ==============================

    const botoesEditar = document.querySelectorAll(".edit");

    botoesEditar.forEach((botao) => {

        botao.addEventListener("click", function () {

            // pega a linha da tabela
            const linha = botao.closest("tr");

            // pega os dados
            const nome = linha.querySelector("strong");
            const cpf = linha.querySelector("span");
            const email = linha.children[1];
            const telefone = linha.children[2];
            const tipo = linha.children[3];
            const status = linha.querySelector(".status");

            // prompts
            const novoNome = prompt("Editar nome:", nome.innerText);

            if (novoNome !== null && novoNome !== "") {
                nome.innerText = novoNome;
            }

            const novoCPF = prompt(
                "Editar CPF:",
                cpf.innerText.replace("CPF: ", "")
            );

            if (novoCPF !== null && novoCPF !== "") {
                cpf.innerText = "CPF: " + novoCPF;
            }

            const novoEmail = prompt(
                "Editar email:",
                email.innerText
            );

            if (novoEmail !== null && novoEmail !== "") {
                email.innerText = novoEmail;
            }

            const novoTelefone = prompt(
                "Editar telefone:",
                telefone.innerText
            );

            if (novoTelefone !== null && novoTelefone !== "") {
                telefone.innerText = novoTelefone;
            }

            const novoTipo = prompt(
                "Editar tipo:",
                tipo.innerText
            );

            if (novoTipo !== null && novoTipo !== "") {
                tipo.innerText = novoTipo;
            }

            const novoStatus = prompt(
                "Editar status (Ativo/Inativo):",
                status.innerText.trim()
            );

            if (novoStatus !== null && novoStatus !== "") {

                status.innerText = novoStatus;

                // altera cor do status
                if (novoStatus.toLowerCase() === "ativo") {

                    status.classList.remove("inactive-user");
                    status.classList.add("active-user");

                } else {

                    status.classList.remove("active-user");
                    status.classList.add("inactive-user");

                }
            }

            // atualizar avatar
            const avatar = linha.querySelector(".avatar");

            let iniciais = novoNome
                .split(" ")
                .map(nome => nome[0])
                .join("")
                .substring(0, 2)
                .toUpperCase();

            avatar.innerText = iniciais;

            alert("Usuário atualizado com sucesso!");

        });

    });

    // ==============================
    // BOTÕES EXCLUIR
    // ==============================

    const botoesExcluir = document.querySelectorAll(".delete");

    botoesExcluir.forEach((botao) => {

        botao.addEventListener("click", function () {

            const linha = botao.closest("tr");

            const nome = linha.querySelector("strong").innerText;

            const confirmar = confirm(
                "Deseja excluir " + nome + "?"
            );

            if (confirmar) {

                linha.remove();

                atualizarCards();

                alert("Usuário excluído com sucesso!");

            }

        });

    });

    // ==============================
    // ATUALIZAR CARDS
    // ==============================

    function atualizarCards() {

        const linhas = document.querySelectorAll("tbody tr");

        let total = 0;
        let alunos = 0;
        let professores = 0;
        let bibliotecarios = 0;

        linhas.forEach((linha) => {

            total++;

            const tipo = linha.children[3].innerText
                .trim()
                .toLowerCase();

            if (tipo === "aluno") {
                alunos++;
            }

            if (tipo === "professor") {
                professores++;
            }

            if (
                tipo === "bibliotecário" ||
                tipo === "bibliotecario"
            ) {
                bibliotecarios++;
            }

        });

        const cards = document.querySelectorAll(".info-card h3");

        cards[0].innerText = total;
        cards[1].innerText = alunos;
        cards[2].innerText = professores;
        cards[3].innerText = bibliotecarios;

    }

    // inicia cards
    atualizarCards();

<<<<<<< HEAD
};
=======

// ======================================
// PEGAR INICIAIS
// ======================================
function getIniciais(nome) {

    if (!nome) return "??";

    return nome
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase();

}


// ======================================
// DELETAR USUÁRIO
// ======================================
async function deletarUsuario(id) {

    const confirmar =
        confirm(
            "Deseja deletar este usuário?"
        );

    if (!confirmar) return;

    try {

        const resposta =
            await fetch(
                `${API}/deletar/${id}`,
                {
                    method: "DELETE"
                }
            );

        if (resposta.ok) {

            alert("Usuário deletado!");

            carregarUsuarios();

        } else {

            alert("Erro ao deletar usuário");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro no servidor");

    }

}


// ======================================
// EDITAR USUÁRIO
// ======================================
function editarUsuario(id) {

    window.location.href =
        `editarusuario.html?id=${id}`;

}


// ======================================
// LOGOUT
// ======================================
function logout() {

    const botao =
        document.querySelector(
            ".logout-btn"
        );

    botao.addEventListener(
        "click",
        () => {

            const sair =
                confirm("Deseja sair?");

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

        carregarUsuarios();

        logout();

    }
);



>>>>>>> branch 'master' of https://github.com/JenifferVitoria/biblioteca.git
