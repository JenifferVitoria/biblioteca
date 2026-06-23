const API = "http://localhost:8080/emprestimos";


// ==============================
// CARREGAR EMPRÉSTIMOS
// ==============================
async function carregarLocacoes() {

    try {

        const resposta = await fetch(
            `${API}/listartodos`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao carregar locações");
        }

        const emprestimos = await resposta.json();

        const tbody =
            document.querySelector("tbody");

        tbody.innerHTML = "";

        let ativos = 0;
        let atrasados = 0;
        let total = emprestimos.length;
        let devolucoesHoje = 0;

        const hoje = new Date();

        emprestimos.forEach(emp => {

            const dataEmprestimo =
                emp.dataEmprestimo;

            const dataDevolucao =
                emp.dataDevolucao;

            // STATUS
            const status =
                emp.status ?
                    emp.status.toLowerCase()
                    : "ativo";

            if (status === "ativo") {
                ativos++;
            }

            // DETECTAR ATRASO
            const devolucao = new Date(dataDevolucao);

            if (devolucao < hoje && status === "ativo") {
                atrasados++;
            }

            // VER SE É HOJE
            const isHoje =
                devolucao.toDateString()
                === hoje.toDateString();

            if (isHoje) {
                devolucoesHoje++;
            }

            tbody.innerHTML += `
                <tr>

                    <td class="book-info">

                        <img src="http://localhost:8080/uploads/${emp.livro?.imagem || 'padrao.png'}">

                        <div>

                            <strong>
                                ${emp.livro?.titulo || "Sem título"}
                            </strong>

                            <span>
                                ${emp.livro?.autor || ""}
                            </span>

                            <small>
                                ISBN: ${emp.livro?.isbn || ""}
                            </small>

                        </div>

                    </td>

                    <td>
                        ${formatarData(dataEmprestimo)}
                    </td>

                    <td>
                        ${formatarData(dataDevolucao)}
                    </td>

                    <td>

                        <span class="days-badge">
                            <i class="bi bi-clock"></i>
                            ${diasRestantes(devolucao)} dias
                        </span>

                    </td>

                    <td>

                        <span class="status active-status">
                            ● ${status}
                        </span>

                    </td>

                    <td>

                        <button class="btn-renew"
                            onclick="renovarEmprestimo(${emp.id})">

                            <i class="bi bi-calendar-check"></i>
                            Renovar

                        </button>

                    </td>

                </tr>
            `;
        });

        // ==============================
        // ATUALIZAR CARDS
        // ==============================
        document.querySelectorAll(".info-card h3")[0].innerText = ativos;
        document.querySelectorAll(".info-card h3")[1].innerText = devolucoesHoje;
        document.querySelectorAll(".info-card h3")[2].innerText = atrasados;
        document.querySelectorAll(".info-card h3")[3].innerText = total;

    } catch (erro) {

        console.error(erro);
        alert("Erro ao carregar locações");

    }
}


// ==============================
// RENOVAR EMPRÉSTIMO
// ==============================
async function renovarEmprestimo(id) {

    try {

        const resposta = await fetch(
            `${API}/renovar/${id}`,
            {
                method: "PUT"
            }
        );

        if (resposta.ok) {

            alert("Empréstimo renovado!");
            carregarLocacoes();

        } else {

            alert("Erro ao renovar empréstimo");

        }

    } catch (erro) {

        console.error(erro);
        alert("Erro no servidor");

    }
}


// ==============================
// UTILITÁRIOS
// ==============================
function formatarData(data) {

    if (!data) return "";

    const d = new Date(data);

    return d.toLocaleDateString("pt-BR");
}


function diasRestantes(data) {

    const hoje = new Date();
    const dev = new Date(data);

    const diff =
        Math.ceil((dev - hoje) / (1000 * 60 * 60 * 24));

    return diff > 0 ? diff : 0;
}


// ==============================
// INICIAR PÁGINA
// ==============================
window.addEventListener(
    "DOMContentLoaded",
    carregarLocacoes
);