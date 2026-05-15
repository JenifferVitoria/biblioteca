const API = "http://localhost:8080/usuarios";


// =====================================
// VALIDAR CPF (BÁSICO)
// =====================================
function validaCPF(input) {

    let cpf = input.value.replace(/\D/g, "");

    if (cpf.length !== 11) {

        alert("CPF inválido!");
        input.value = "";
        return false;

    }

    return true;

}


// =====================================
// VALIDAR SENHAS
// =====================================
function confirmandoSenha() {

    const senha =
        document.getElementById("senha").value;

    const confirmar =
        document.getElementById("confirmarSenha").value;

    if (senha !== confirmar) {

        alert("As senhas não conferem!");

        document.getElementById(
            "confirmarSenha"
        ).value = "";

        return false;

    }

    return true;

}


// =====================================
// SALVAR USUÁRIO
// =====================================
async function salvar(event) {

    event.preventDefault();

    const usuario = {

        nome: document.getElementById("nomeCompleto").value,
        cpf: document.getElementById("cpf").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        senha: document.getElementById("senha").value,
        tipo: document.getElementById("tipoUsuario").value

    };

    // validação simples
    if (
        !usuario.nome ||
        !usuario.email ||
        !usuario.senha
    ) {

        alert("Preencha todos os campos obrigatórios!");
        return;

    }

    try {

        const resposta =
            await fetch(
                `${API}/salvar`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuario)
                }
            );

        if (resposta.ok) {

            alert("Usuário cadastrado com sucesso!");

            window.location.href =
                "login.html";

        } else {

            const erro =
                await resposta.text();

            console.error(erro);

            alert("Erro ao cadastrar usuário");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro no servidor");

    }

}


// =====================================
// INICIAR EVENTO
// =====================================
window.addEventListener("DOMContentLoaded", () => {

    document
        .querySelector(".btn-cadastrar")
        .addEventListener("click", salvar);

});