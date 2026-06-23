
// emprestimo.js

window.onload = function () {

    // ============================
    // FORMULÁRIO
    // ============================

    const form = document.querySelector("form");

    // ============================
    // CAMPOS
    // ============================

    const id = document.querySelector('input[name="id"]');

    const dataEmprestimo = document.querySelector(
        'input[name="dataEmprestimo"]'
    );

    const dataDevolucao = document.querySelector(
        'input[name="dataDevolucao"]'
    );

    const status = document.querySelector(
        'select[name="status"]'
    );

    const locador = document.querySelector(
        'input[name="locador"]'
    );

    const locatario = document.querySelector(
        'input[name="locatario"]'
    );

    const livro = document.querySelector(
        'input[name="livro"]'
    );

    // ============================
    // ALERTA
    // ============================

    const alerta = document.createElement("div");

    alerta.classList.add(
        "alert",
        "alert-success",
        "mt-4"
    );

    alerta.style.display = "none";

    alerta.innerHTML = `
        <i class="bi bi-check-circle-fill"></i>
        Empréstimo cadastrado com sucesso!
    `;

    document.querySelector(".card-body")
        .appendChild(alerta);

    // ============================
    // EVENTO SUBMIT
    // ============================

    form.addEventListener("submit", function (event) {

        // impedir reload
        event.preventDefault();

        // ============================
        // VALIDAÇÕES
        // ============================

        if (id.value === "") {

            alert("Preencha o ID.");
            id.focus();
            return;

        }

        if (dataEmprestimo.value === "") {

            alert("Preencha a data do empréstimo.");
            dataEmprestimo.focus();
            return;

        }

        if (dataDevolucao.value === "") {

            alert("Preencha a data da devolução.");
            dataDevolucao.focus();
            return;

        }

        if (status.value === "") {

            alert("Selecione o status.");
            status.focus();
            return;

        }

        if (locador.value.trim() === "") {

            alert("Preencha o locador.");
            locador.focus();
            return;

        }

        if (locatario.value.trim() === "") {

            alert("Preencha o locatário.");
            locatario.focus();
            return;

        }

        if (livro.value.trim() === "") {

            alert("Preencha o livro.");
            livro.focus();
            return;

        }

        // ============================
        // VALIDAÇÃO DE DATAS
        // ============================

        const dataEmp = new Date(dataEmprestimo.value);
        const dataDev = new Date(dataDevolucao.value);

        if (dataDev < dataEmp) {

            alert(
                "A data de devolução não pode ser menor que a data do empréstimo."
            );

            dataDevolucao.focus();

            return;

        }

        // ============================
        // OBJETO EMPRÉSTIMO
        // ============================

        const emprestimo = {

            id: id.value,

            dataEmprestimo: dataEmprestimo.value,

            dataDevolucao: dataDevolucao.value,

            status: status.value,

            locador: locador.value,

            locatario: locatario.value,

            livro: livro.value

        };

        // ============================
        // EXIBIR NO CONSOLE
        // ============================

        console.log(emprestimo);

        // ============================
        // ALERTA SUCESSO
        // ============================

        alerta.style.display = "block";

        // esconder alerta
        setTimeout(() => {

            alerta.style.display = "none";

        }, 3000);

        // ============================
        // LIMPAR FORMULÁRIO
        // ============================

        form.reset();

    });

};

const API_EMPRESTIMOS_LISTARTODOS = 'http://localhost:8000/emprestimos/listartodos';


async function listarEmprestimos() {
  const response = await fetch(API_EMPRESTIMOS_LISTARTODOS);
  const emprestimos = await response.json();

  const tbody = document.getElementById("emprestimo");

  tbody.innerHTML = ""; // 🔥 LIMPA ANTES DE ADICIONAR

  emprestimos.forEach(emprestimo => {
    const tr = document.createElement("tr");

	tr.innerHTML = `
	            <td>${emprestimo.id}</td>
	            <td>${emprestimo.dataEmprestimo}</td>
	            <td>${emprestimo.dataDevolucao}</td>
				<td>12</td>
				<td>${emprestimo.status}</td>		
	            <td>
        <button class="btn btn-warning btn-sm" onclick="editar(${emprestimo.id})">Renovar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}
//FUNÇÃO PARA CARREGAR OS DADOS AO INICIALIZAR A PÁGINA
document.addEventListener("DOMContentLoaded", () => {

	listarEmprestimos();
})



