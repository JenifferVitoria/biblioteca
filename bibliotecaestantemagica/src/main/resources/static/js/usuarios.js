const API = "http://localhost:8080/alunos";


// ======================================
// CARREGAR USUÁRIOS
// ======================================
async function carregarUsuarios() {

    try {

        const resposta =
            await fetch(
                `${API}/listartodos`
            );

        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar usuários"
            );

        }

        const usuarios =
            await resposta.json();

        const tbody =
            document.querySelector(
                "tbody"
            );

        tbody.innerHTML = "";

        let total = usuarios.length;
        let alunos = 0;
        let professores = 0;
        let bibliotecarios = 0;

        usuarios.forEach(user => {

            let tipo = user.tipo || "Aluno";

            if (tipo === "Aluno") alunos++;
            else if (tipo === "Professor") professores++;
            else bibliotecarios++;

            tbody.innerHTML += `

                <tr>

                    <td class="user-info">

                        <div class="avatar">
                            ${getIniciais(user.nome)}
                        </div>

                        <div>

                            <strong>
                                ${user.nome}
                            </strong>

                            <span>
                                CPF: ${user.cpf || "--"}
                            </span>

                        </div>

                    </td>

                    <td>
                        ${user.email}
                    </td>

                    <td>
                        ${user.telefone || "--"}
                    </td>

                    <td>
                        ${tipo}
                    </td>

                    <td>

                        <span class="status active-user">
                            ${user.ativo ? "Ativo" : "Inativo"}
                        </span>

                    </td>

                    <td>

                        <div class="actions">

                            <button class="btn-action edit"
                                onclick="editarUsuario(${user.id})">

                                <i class="bi bi-pencil"></i>

                            </button>

                            <button class="btn-action delete"
                                onclick="deletarUsuario(${user.id})">

                                <i class="bi bi-trash"></i>

                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });

        // CARDS
        const cards =
            document.querySelectorAll(
                ".info-card h3"
            );

        cards[0].innerText = total;
        cards[1].innerText = alunos;
        cards[2].innerText = professores;
        cards[3].innerText = bibliotecarios;

    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao carregar usuários"
        );

    }

}


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



