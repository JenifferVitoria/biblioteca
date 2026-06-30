const API_LIVROS = "http://localhost:8080/livros";
const API_ALUNOS = "http://localhost:8080/alunos";

window.onload = function () {

    carregarDashboard();

    ativarMenu();

}

async function carregarDashboard() {

    let respostaLivros = await fetch(API_LIVROS + "/listartodos");
    let livros = await respostaLivros.json();

    let respostaAlunos = await fetch(API_ALUNOS + "/listartodos");
    let alunos = await respostaAlunos.json();

    let totalLivros = livros.length;
    let emprestados = 0;
    let devolvidos = 0;
    let reservados = 0;
    let multas = 0;

    for (let i = 0; i < livros.length; i++) {

        if (livros[i].status == "Emprestado") {
            emprestados++;
        }

        if (livros[i].status == "Devolvido") {
            devolvidos++;
        }

        if (livros[i].status == "Reservado") {
            reservados++;
        }

        if (livros[i].multa == true) {
            multas++;
        }

    }

    document.getElementById("totalLivros").innerHTML = totalLivros;
    document.getElementById("emprestados").innerHTML = emprestados;
    document.getElementById("devolvidos").innerHTML = devolvidos;
    document.getElementById("reservados").innerHTML = reservados;
    document.getElementById("multas").innerHTML = multas;
    document.getElementById("usuarios").innerHTML = alunos.length;

    carregarEmprestimos(livros);
}



function carregarEmprestimos(livros) {

    let lista = document.getElementById("listaEmprestimos");

    let html = "";

    for (let i = 0; i < livros.length; i++) {

        if (livros[i].status == "Emprestado") {

            html +=
            "<div class='emprestimo-item'>" +

                "<img src='http://localhost:8080/uploads/" + livros[i].imagem + "' width='70'>" +

                "<div class='emprestimo-info'>" +

                    "<h5>" + livros[i].titulo + "</h5>" +

                    "<p>" + livros[i].autor + "</p>" +

                    "<span>Usuário: " + livros[i].usuario + "</span>" +

                "</div>" +

                "<div class='emprestimo-data'>" +

                    "<small>Devolver até:</small><br>" +

                    "<strong>" + livros[i].dataDevolucao + "</strong>" +

                "</div>" +

            "</div>";

        }

    }

    lista.innerHTML = html;

}


async function buscarLivro() {

    let texto = document.getElementById("pesquisa").value;

    let resposta = await fetch(API_LIVROS + "/listartodos");

    let livros = await resposta.json();

    let encontrado = false;

    for (let i = 0; i < livros.length; i++) {

        if (livros[i].titulo == texto) {

            encontrado = true;

        }

    }

    if (encontrado == true) {

        alert("Livro encontrado!");

    } else {

        alert("Livro não encontrado.");

    }

}



function ativarMenu() {

    let menus = document.getElementsByClassName("menu-item");

    for (let i = 0; i < menus.length; i++) {

        menus[i].onclick = function () {

            for (let j = 0; j < menus.length; j++) {

                menus[j].classList.remove("active");

            }

            this.classList.add("active");

        }

    }

}


function logout() {

    let sair = confirm("Deseja sair do sistema?");

    if (sair == true) {

        localStorage.clear();

        window.location.href = "login.html";

    }

}