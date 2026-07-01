const API_LISTAR = "http://localhost:8000/emprestimos/listarra";

document.addEventListener("DOMContentLoaded", () => {
    listarLocacoes();
});

async function listarLocacoes() {

    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    if (usuario == null) {
        alert("Usuário não está logado.");
        return;
    }

    const response = await fetch(`${API_LISTAR}/${usuario.ra}`);
    const dados = await response.json();

    const tbody = document.getElementById("emprestimos");
    tbody.innerHTML = "";

    dados.forEach(dado => {

        tbody.innerHTML += `
            <tr>
                <td>${dado.livro?.titulo || ""}</td>
                <td>${dado.dataEmprestimo || ""}</td>
                <td>${dado.status || ""}</td>
            </tr>
        `;
    });
}