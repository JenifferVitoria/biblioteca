window.onload = function () {


    const form = document.querySelector("form");


    const nome =
        document.getElementById("nomeCompleto");

    const cpf =
        document.getElementById("cpf");

    const email =
        document.getElementById("email");

    const telefone =
        document.getElementById("telefone");

    const endereco =
        document.getElementById("endereco");

    const dataNascimento =
        document.getElementById("dataNascimento");

    const senha =
        document.getElementById("senha");

    const confirmarSenha =
        document.getElementById("confirmarSenha");

    const tipoUsuario =
        document.getElementById("tipoUsuario");

		
		

    cpf.addEventListener("input", function () {

        let valor =
            cpf.value.replace(/\D/g, "");

        valor = valor.replace(
            /(\d{3})(\d)/,
            "$1.$2"
        );

        valor = valor.replace(
            /(\d{3})(\d)/,
            "$1.$2"
        );

        valor = valor.replace(
            /(\d{3})(\d{1,2})$/,
            "$1-$2"
        );

        cpf.value = valor;

    });

   


    // VALIDAR CPF // 

    window.validaCPF = function () {

        const valor =
            cpf.value.replace(/\D/g, "");

        if (valor.length !== 11) {

            alert("CPF inválido!");

            cpf.focus();

            return false;

        }

        return true;

    };

 
    // CONFIRMAR SENHA // 

    window.confirmandoSenha = function () {

        if (
            senha.value !==
            confirmarSenha.value
        ) {

            alert(
                "As senhas não coincidem!"
            );

            confirmarSenha.focus();

            return false;

        }

        return true;

    };



    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

   
			

            if (
                nome.value.trim() === ""
            ) {

                alert(
                    "Preencha o nome completo."
                );

                nome.focus();

                return;

            }

            if (!validaCPF()) {

                return;

            }

            if (
                email.value.trim() === ""
            ) {

                alert(
                    "Preencha o email."
                );

                email.focus();

                return;

            }

            if (
                telefone.value.trim() === ""
            ) {

                alert(
                    "Preencha o telefone."
                );

                telefone.focus();

                return;

            }

            if (
                endereco.value.trim() === ""
            ) {

                alert(
                    "Preencha o endereço."
                );

                endereco.focus();

                return;

            }

            if (
                dataNascimento.value === ""
            ) {

                alert(
                    "Preencha a data de nascimento."
                );

                dataNascimento.focus();

                return;

            }

            if (
                senha.value.trim() === ""
            ) {

                alert(
                    "Preencha a senha."
                );

                senha.focus();

                return;

            }

            if (!confirmandoSenha()) {

                return;

            }

            if (
                tipoUsuario.selectedIndex === 0
            ) {

                alert(
                    "Selecione o tipo de usuário."
                );

                tipoUsuario.focus();

                return;

            }

         

            const usuario = {

                nome: nome.value,

                cpf: cpf.value,

                email: email.value,

                telefone: telefone.value,

                endereco: endereco.value,

                dataNascimento:
                    dataNascimento.value,

                senha: senha.value,

                tipoUsuario:
                    tipoUsuario.value

            };

          

            console.log(usuario);

          

            alert(
                "Cadastro realizado com sucesso!"
            );

          

            form.reset();

        }
    );

};

async function logar() {

    // captura campos
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // objeto login
    const usuario = {
        email: email,
        senha: senha
    };

	console.log(usuario);
	
    // envia requisição para o backend
    const response = await fetch("http://localhost:8000/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    // verifica resposta
    if (response.ok) {
        const data = await response.json();

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify(data)
        );

        // redireciona para página de usuário
        window.location.href = "dashboardbibliotecario.html";

    } else {
        alert("Email ou senha inválidos!");
    }
}