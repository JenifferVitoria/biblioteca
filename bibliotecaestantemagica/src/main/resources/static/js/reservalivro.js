const API_LISTAR_ID = "http://192.168.10.22:8000/livros/listarid";
const API_RESERVAR = "http://192.168.10.22:8000/livros/reservar";


/// PEGAR ID DA URL

function obterIdLivro() {

    const params = new URLSearchParams(window.location.search);

    return params.get("id");
}


/// INICIALIZAÇÃO

document.addEventListener("DOMContentLoaded", () => {

    carregarLivro();

    document.querySelector(".btn-reserve")
        .addEventListener("click", reservarLivro);

});


/// CARREGAR LIVRO

async function carregarLivro() {

    const id = obterIdLivro();

    if (id == null) {

        alert("Livro não encontrado.");
        return;
    }

    const response = await fetch(`${API_LISTAR_ID}/${id}`);

    if (!response.ok) {

        alert("Livro não encontrado.");
        return;
    }

    const livro = await response.json();

    document.querySelector(".book-image img").src =
        `http://192.168.10.22:8000/uploads/${livro.imagem}`;

    document.querySelector(".category").innerText =
        livro.genero;

    document.querySelector(".book-details h2").innerText =
        livro.titulo;

    document.querySelector(".book-details h4").innerText =
        livro.autor;

    document.querySelector(".description").innerText =
        livro.descricao;

    document.querySelectorAll(".info-item span")[0].innerText =
        livro.isbn;

    document.querySelectorAll(".info-item span")[1].innerText =
        livro.genero;

    document.querySelectorAll(".info-item span")[2].innerText =
        livro.idioma;

    document.querySelectorAll(".info-item span")[3].innerText =
        livro.anoPublicacao;
}


/// RESERVAR LIVRO

async function reservarLivro() {

    const id = obterIdLivro();

    if (id == null) {
		
		window.Location.href="livro.html";

        alert("Livro não encontrado.");
        return;
    } 

    const response = await fetch(`${API_RESERVAR}/${id}`, {

        method: "POST"

    });

    const mensagem = await response.text();

    alert(mensagem);

    if (response.ok) {

        const botao = document.querySelector(".btn-reserve");

        botao.disabled = true;

        botao.innerHTML = `
            <i class="bi bi-check-circle-fill"></i>
            Reservado
			
        `;   
    }
}