const API = "http://localhost:8080/alunos";


// CARREGAR PERFIL
async function carregarPerfil() {

    try {

        const id = 1;

        const resposta = await fetch(
            `${API}/listarid/${id}`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar perfil");
        }

        const aluno = await resposta.json();

        // PREENCHER CAMPOS
        document.getElementById("nome").value =
            aluno.nome || "";

        document.getElementById("email").value =
            aluno.email || "";

        document.getElementById("telefone").value =
            aluno.telefone || "";

        document.getElementById("dataNascimento").value =
            aluno.dataNascimento || "";

        document.getElementById("endereco").value =
            aluno.endereco || "";

        document.getElementById("cidade").value =
            aluno.cidade || "";

        document.getElementById("estado").value =
            aluno.estado || "";

        document.getElementById("cep").value =
            aluno.cep || "";

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar perfil");

    }

}


// SALVAR PERFIL
async function salvarPerfil(event) {

    event.preventDefault();

    try {

        const id = 1;

        const dados = {

            nome:
                document.getElementById("nome").value,

            email:
                document.getElementById("email").value,

            telefone:
                document.getElementById("telefone").value,

            dataNascimento:
                document.getElementById("dataNascimento").value,

            endereco:
                document.getElementById("endereco").value,

            cidade:
                document.getElementById("cidade").value,

            estado:
                document.getElementById("estado").value,

            cep:
                document.getElementById("cep").value

        };

        const resposta = await fetch(
            `${API}/atualizar/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(dados)

            }
        );

        if (resposta.ok) {

            alert("Perfil atualizado com sucesso!");

        } else {

            alert("Erro ao atualizar perfil");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro no servidor");

    }

}


// EXECUTA AO ABRIR A PÁGINA
window.addEventListener(
    "DOMContentLoaded",
    carregarPerfil
);