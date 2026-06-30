const API_BUSCAR_TODOS = "http://localhost:8000/emprestimos/listartodos";
const API_RENOVAR = "http://localhost:8000/emprestimos/renovar";



<<<<<<< HEAD
=======
    const resposta = await fetch(`${API}/listartodos`);
>>>>>>> branch 'master' of https://github.com/JenifferVitoria/biblioteca.git

<<<<<<< HEAD
// INICIALIZAR
document.addEventListener("DOMContentLoaded", () => {
=======
    const emprestimos = await resposta.json();
>>>>>>> branch 'master' of https://github.com/JenifferVitoria/biblioteca.git

<<<<<<< HEAD
    listarTodos();

});

// LISTAR EMPRÉSTIMOS
async function listarTodos() {

    const response = await fetch(API_BUSCAR_TODOS);
    const data = await response.json();

    const tbody = document.getElementById("emprestimos");
    tbody.innerHTML = "";

    data.forEach(emprestimo => {

        tbody.innerHTML += `
            <tr>

                <td class="book-info">

                    <img src="${emprestimo.livro?.imagem || ''}">

                    <div>

                        <strong>${emprestimo.livro?.titulo || ""}</strong>

                        <span>${emprestimo.livro?.autor || ""}</span>

                        <small>ISBN: ${emprestimo.livro?.isbn || ""}</small>

                    </div>

                </td>

                <td>${emprestimo.dataEmprestimo}</td>

                <td>${emprestimo.dataDevolucao}</td>

                <td>
                    <span class="days-badge">
                        <i class="bi bi-clock"></i>
                        ${emprestimo.diasRestantes || ""}
                    </span>
                </td>

                <td>

                    <span class="status active-status">

                        ● ${emprestimo.status}

                    </span>

                </td>

                <td>

				
				
                </td>
				

            </tr>
        `;

    });

    atualizarCards(data);

}



// ATUALIZAR CARDS
function atualizarCards(emprestimos) {

    let ativos = 0;
    let devolvidos = 0;
    let atrasados = 0;

    emprestimos.forEach(emprestimo => {

        if (emprestimo.status === "Em andamento") {
            ativos++;
=======
    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    let ativos = 0;
    let atrasados = 0;
    let total = emprestimos.length;
    let devolucoesHoje = 0;

    const hoje = new Date();

    emprestimos.forEach(emp => {

        const dataEmprestimo = emp.dataEmprestimo;
        const dataDevolucao = emp.dataDevolucao;

        const status = emp.status
            ? emp.status.toLowerCase()
            : "ativo";

        if (status === "ativo") ativos++;

        const devolucao = new Date(dataDevolucao);

        if (devolucao < hoje && status === "ativo") {
            atrasados++;
>>>>>>> branch 'master' of https://github.com/JenifferVitoria/biblioteca.git
        }

<<<<<<< HEAD
        if (emprestimo.status === "Devolvido") {
            devolvidos++;
        }

        if (emprestimo.status === "Atrasado") {
            atrasados++;
        }

    });

    document.querySelectorAll(".info-card h3")[0].textContent = ativos;
    document.querySelectorAll(".info-card h3")[1].textContent = devolvidos;
    document.querySelectorAll(".info-card h3")[2].textContent = atrasados;
    document.querySelectorAll(".info-card h3")[3].textContent = emprestimos.length;
=======
        if (devolucao.toDateString() === hoje.toDateString()) {
            devolucoesHoje++;
        }

        tbody.innerHTML += `
            <tr>
                <td class="book-info">
                    <img src="http://localhost:8080/uploads/${emp.livro?.imagem || 'padrao.png'}">

                    <div>
                        <strong>${emp.livro?.titulo || "Sem título"}</strong>
                        <span>${emp.livro?.autor || ""}</span>
                        <small>ISBN: ${emp.livro?.isbn || ""}</small>
                    </div>
                </td>

                <td>${formatarData(dataEmprestimo)}</td>

                <td>${formatarData(dataDevolucao)}</td>

                <td>
                    <span class="days-badge">
                        <i class="bi bi-clock"></i>${diasRestantes(devolucao)} dias</span>
                </td>

                <td>
                    <span class="status active-status"> ${status}</span>
                </td>

                <td>
                    <button class="btn-renew"onclick="renovarEmprestimo(${emp.id})"><i class="bi bi-calendar-check"></i>
                     Renovar
                    </button>
                </td>
            </tr>
        `;
    });

    document.querySelectorAll(".info-card h3")[0].innerText = ativos;
    document.querySelectorAll(".info-card h3")[1].innerText = devolucoesHoje;
    document.querySelectorAll(".info-card h3")[2].innerText = atrasados;
    document.querySelectorAll(".info-card h3")[3].innerText = total;
}


// ==============================
// RENOVAR EMPRÉSTIMO
// ==============================
async function renovarEmprestimo(id) {

    const resposta = await fetch(`${API}/renovar/${id}`, {
        method: "PUT"
    });

    if (resposta.ok) {
        alert("Empréstimo renovado!");
        carregarLocacoes();
    } else {
        alert(" Empréstimo não renovado");
    }
}
>>>>>>> branch 'master' of https://github.com/JenifferVitoria/biblioteca.git

<<<<<<< HEAD
}
=======

// ==============================
// UTILITÁRIOS
// ==============================
function formatarData(data) {

    let dataFormatada = new Date(data);

    return dataFormatada.toLocaleDateString("pt-BR");

}

function diasRestantes(data) {

    let hoje = new Date();

    let dataDevolucao = new Date(data);

    let diferenca = dataDevolucao - hoje;

    let dias = diferenca / (1000 * 60 * 60 * 24);

    return Math.ceil(dias);

}

// ==============================
// INICIAR PÁGINA
// ==============================
window.addEventListener(
    "DOMContentLoaded",
    carregarLocacoes
);
>>>>>>> branch 'master' of https://github.com/JenifferVitoria/biblioteca.git
