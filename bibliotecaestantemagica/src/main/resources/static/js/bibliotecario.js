const API_LISTAR_TODAS_MULTAS = "http://localhost:8080/multas/listartodos";
const API_LISTAR_TODOS_EMPRESTIMOS = "http://localhost:8000/emprestimos/listartodos";

function voltarPagina() {
    window.location.href = "login.html";
}

let editandoId = null;


function limparFormulario() {
		document.getElementById("valor").value="";
		document.getElementById("diasAtraso").value="";
		document.getElementById("dataGeracao").value="";
		document.getElementById("paga").value="";

    editandoId = null;
}



window.onload = function () {
    carregarEmprestimosAtivos();
    carregarMultasPendentes();
};


async function carregarEmprestimosAtivos() {

    const response = await fetch(API_LISTAR_TODOS_EMPRESTIMOS);
    const emprestimos = await resposta.json();

    let ativos = emprestimos.filter(e => e.status === "ATIVO");

    preencherEmprestimos(ativos);
}


function preencherEmprestimos(lista) {

    const container = document.getElementById("lista-emprestimos");

    container.innerHTML = "";

    lista.forEach(emp => {

        container.innerHTML += `
            <div class="emprestimo-item">

                <div class="emprestimo-info">
                    <h4>${emp.livro.titulo}</h4>
                    <p>${emp.livro.autor}</p>
                    <small>Usuário: ${emp.usuario.nome}</small><br>
                    <small>Data: ${emp.dataEmprestimo}</small>
                </div>

            </div>
        `;
    });
}


async function carregarMultasPendentes() {

    const response = await fetch(API_LISTAR_TODAS_MULTAS);
    const multas = await resposta.json();

    const pendentes = multas.filter(m => m.status === "PENDENTE");

    preencherMultas(pendentes);
}


function preencherMultas(lista) {

    const container = document.getElementById("lista-multas");

    container.innerHTML = "";

    lista.forEach(multa => {

        container.innerHTML += `
            <div class="multa-item">

                <div class="multa-info">
                    <h4>${multa.usuario.nome}</h4>
                    <p>Atraso: ${multa.diasAtraso} dias</p>
                    <small>Livro: ${multa.livro.titulo}</small>
                </div>

                <div class="multa-valor">
                    <strong>R$ ${multa.valor.toFixed(2)}</strong>
                </div>

            </div>
        `;
    });
}




function irEmprestimos() {
    window.location.href = "emprestimos.html";
}

function irMultas() {
    window.location.href = "multas.html";
}