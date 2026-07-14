async function logar() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = {
        email: email,
        senha: senha
    };

    const response = await fetch("http://localhost:8000/Usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });


    if (!response.ok) {
        alert("Email ou senha inválidos!");
        return;
    }

    // tenta ler o JSON // 
	
	
    const usuarioLogado = await response.json();

    console.log(usuarioLogado);

    localStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioLogado)
    );

    // redirecionamento para pegar no formato tipo //
	
	
    if (usuarioLogado.tipo === "Bibliotecário") {

        window.location.href = "dashboardbibliotecario.html";

    } else if (usuarioLogado.tipo === "Aluno") {

        window.location.href = "dashboardaluno.html";

    } else {

        alert("Tipo de usuário inválido: " + usuarioLogado.tipo);

    }
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "login.html";
}