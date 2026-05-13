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

function logout(){
	
	localStorage.removeItem("usuarioLogado");
	window.location.href = "login.html";
}
