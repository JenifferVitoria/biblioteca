const API_LISTAR = "http://localhost:8000/emprestimos/listartodos";

document.addEventListener("DOMContentLoaded", () => {
    listarLocacoes();
});

async function listarLocacoes() {

    const response = await fetch(API_LISTAR);
    const dados = await response.json();

    const tbody = document.getElementById("emprestimos");
    tbody.innerHTML = "";
	

	const dataEmprestimo = new Date(dados.dataEmprestimo);
	dataEmprestimo.setDate(dataEmprestimo.getDate() + 10);

    dados.forEach(dado => {

        tbody.innerHTML += `
            <tr>
                <td>${dado.livro?.titulo || ""}</td>
                <td>${dado.dataEmprestimo || ""}</td>
				<td>${dado.dataDevolucao || ""}</td>
                <td>${dado.status || ""}</td>
            </tr>
        `;
    });
}