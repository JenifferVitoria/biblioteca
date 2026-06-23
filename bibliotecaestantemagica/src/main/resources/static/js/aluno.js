// FUNÇÃO DE LOGOUT
function logout() {

    const confirmar = confirm("Deseja realmente sair do sistema?");

    if(confirmar){
        alert("Logout realizado com sucesso!");
        window.location.href = "login.html";
    }
}

// BUSCAR LIVROS
function buscarLivros() {

    const input = document.querySelector(".search-box input");
    const filtro = input.value.toLowerCase();

    const livros = document.querySelectorAll(".book-card");

    livros.forEach(livro => {

        const titulo = livro.querySelector("h5").textContent.toLowerCase();
        const autor = livro.querySelector("p").textContent.toLowerCase();

        if(titulo.includes(filtro) || autor.includes(filtro)){
            livro.style.display = "block";
        } else {
            livro.style.display = "none";
        }
    });

    if(filtro === ""){
        livros.forEach(livro => {
            livro.style.display = "block";
        });
    }
}

// ABRIR LIVRO
function abrirLivro(titulo){

    alert(`Você selecionou o livro: ${titulo}`);
}

// NOTIFICAÇÕES
function abrirNotificacoes(){

    alert("Você possui 2 livros próximos da devolução.");
}

// VER TODAS LOCAÇÕES
function verLocacoes(){

    alert("Abrindo todas as locações...");
}

// EVENTOS AUTOMÁTICOS
document.addEventListener("DOMContentLoaded", () => {

    // CLIQUE NOS LIVROS
    const livros = document.querySelectorAll(".book-card");

    livros.forEach(livro => {

        livro.addEventListener("click", () => {

            const titulo = livro.querySelector("h5").textContent;

            abrirLivro(titulo);
        });
    });

    // NOTIFICAÇÃO
    const notificacao = document.querySelector(".notification-icon");

    notificacao.addEventListener("click", abrirNotificacoes);

    // BOTÃO LOCAÇÕES
    const btnLocacoes = document.querySelector(".btn-locacoes");

    btnLocacoes.addEventListener("click", verLocacoes);

    // ENTER NA PESQUISA
    const inputBusca = document.querySelector(".search-box input");

    inputBusca.addEventListener("keypress", (e) => {

        if(e.key === "Enter"){
            buscarLivros();
        }
    });
});
