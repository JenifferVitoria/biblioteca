const API = "http://localhost:8080/emprestimos";


// ==============================
// CARREGAR EMPRÉSTIMOS
// ==============================
async function carregarLocacoes() {

    const resposta = await fetch(`${API}/listartodos`);

    const emprestimos = await resposta.json();

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
        }

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
