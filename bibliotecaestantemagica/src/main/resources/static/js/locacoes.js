const API_LISTAR = "http://localhost:8000/emprestimos/listarusuario";

document.addEventListener("DOMContentLoaded", () => {
    listarLocacoes();
});

async function listarLocacoes() {

    const response = await fetch(API_LISTAR);
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