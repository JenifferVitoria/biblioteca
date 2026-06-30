const API_BUSCAR_TODOS = "http://localhost:8000/emprestimos/listartodos";
const API_RENOVAR = "http://localhost:8000/emprestimos/renovar";




// INICIALIZAR
document.addEventListener("DOMContentLoaded", () => {

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
        }

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

}