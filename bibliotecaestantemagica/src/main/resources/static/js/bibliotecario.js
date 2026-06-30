const API_EMPRESTIMOS = "http://localhost:8080/emprestimos";

async function listarEmprestimos() {

    let resposta = await fetch(API_EMPRESTIMOS + "/listartodos");
    let emprestimos = await resposta.json();

    preencherEmprestimo(emprestimos, 0, 1);
    preencherEmprestimo(emprestimos, 1, 2);
    preencherEmprestimo(emprestimos, 2, 3);

}

function preencherEmprestimo(emprestimos, indice, card) {

    if (emprestimos.length > indice) {

        document.getElementById("tituloLivro" + card).innerHTML =
            emprestimos[indice].livro.titulo;

        document.getElementById("autorLivro" + card).innerHTML =
            emprestimos[indice].livro.autor;

        document.getElementById("usuarioLivro" + card).innerHTML =
            "Usuário: " + emprestimos[indice].locatario.nome;

        document.getElementById("dataLivro" + card).innerHTML =
            emprestimos[indice].dataDevolucao;

    }

}

window.onload = function () {

    listarEmprestimos();

}