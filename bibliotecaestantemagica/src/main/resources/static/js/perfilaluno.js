const API = "http://localhost:8080/alunos";


// CARREGAR PERFIL

async function carregarPerfil() {

    try {

        const id = 1;

        const resposta = await fetch(
            `${API}/listarid/${id}`
        );

        if (!resposta.ok) {
            throw new Error("Erro ao buscar perfil");
        }

        const aluno = await resposta.json();

        // PREENCHER CAMPOS
        document.getElementById("nome").value =
            aluno.nome || "";

        document.getElementById("email").value =
            aluno.email || "";

        document.getElementById("telefone").value =
            aluno.telefone || "";

        document.getElementById("dataNascimento").value =
            aluno.dataNascimento || "";

        document.getElementById("endereco").value =
            aluno.endereco || "";

        document.getElementById("cidade").value =
            aluno.cidade || "";

        document.getElementById("estado").value =
            aluno.estado || "";

        document.getElementById("cep").value =
            aluno.cep || "";

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar perfil");

    }

}


// SALVAR PERFIL

function salvarPerfil() {

    const perfil = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        nascimento: document.getElementById("nascimento").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        cep: document.getElementById("cep").value
    };

    console.log("Perfil atualizado:", perfil);

    alert("Perfil atualizado com sucesso!");
}


// ABRIR MODAL DE SEGURANÇA (SENHA)

function abrirAlterarSenha() {

    const modal = new bootstrap.Modal(
        document.getElementById("modalSegurancaConta")
    );

    modal.show();
}


// ALTERAR SENHA

function alterarSenha() {

    const senhaAtual = document.getElementById("senhaAtual").value;
    const novaSenha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
    const msg = document.getElementById("msgSeguranca");

    msg.innerHTML = "";

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
        msg.innerHTML = `
            <div class="alert alert-warning">
                Preencha todos os campos!
            </div>`;
        return;
    }

    if (novaSenha !== confirmarSenha) {
        msg.innerHTML = `
            <div class="alert alert-danger">
                As senhas não conferem!
            </div>`;
        return;
    }

    // Simulação de API
	
    console.log("Senha alterada com sucesso!");

    msg.innerHTML = `
        <div class="alert alert-success">
            Senha atualizada com sucesso!
        </div>`;

    // limpar campos
	
    document.getElementById("senhaAtual").value = "";
    document.getElementById("novaSenha").value = "";
    document.getElementById("confirmarSenha").value = "";

    // fechar modal automaticamente
	
    setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalSenha'));
        modal.hide();
    }, 1200);
}



// ALTERAR E-MAIL (SIMULAÇÃO)

function alterarEmail() {

    const novoEmail = prompt("Digite o novo e-mail de recuperação:");

    if (novoEmail) {
        console.log("Novo e-mail:", novoEmail);

        alert("E-mail de recuperação atualizado com sucesso!");
    }
}



// GERENCIAR PREFERÊNCIAS

function gerenciarPreferencias() {

    alert("Aqui você pode futuramente abrir um modal de preferências.");
}



// VER SESSÕES ATIVAS

function verSessoes() {

    alert(`
Dispositivos conectados:

 Chrome (Windows) - Online
 Android - 2h atrás
 iPhone - 1 dia atrás
    `);
}


function salvarPreferencias() {

    const email = document.getElementById("emailNotificacao").checked;
    const sms = document.getElementById("smsNotificacao").checked;
    const push = document.getElementById("pushNotificacao").checked;

    const msg = document.getElementById("msgPreferencias");

    msg.innerHTML = "";

    
    console.log({
        email,
        sms,
        push
    });

    msg.innerHTML = `
        <div class="alert alert-success">
            Preferências salvas com sucesso!
        </div>
    `;

    // fecha modal automaticamente
    setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(
            document.getElementById('modalPreferencias')
        );
        modal.hide();
    }, 1000);
}


function encerrarSessao(btn) {

    const item = btn.closest(".list-group-item");
    const msg = document.getElementById("msgSessoes");

    item.remove();

    msg.innerHTML = `
        <div class="alert alert-warning">
            Sessão encerrada com sucesso.
        </div>
    `;
}

function encerrarTodasSessoes() {

    const lista = document.querySelectorAll(".list-group-item");
    const msg = document.getElementById("msgSessoes");

    lista.forEach(item => item.remove());

    msg.innerHTML = `
        <div class="alert alert-danger">
            Todas as sessões foram encerradas!
        </div>
    `;
}

function encerrarSessao(btn) {

    const item = btn.closest(".list-group-item");
    const msg = document.getElementById("msgSessoes");

    item.remove();

    msg.innerHTML = `
        <div class="alert alert-warning">
            Sessão encerrada com sucesso.
        </div>
    `;
}

function encerrarTodasSessoes() {

    const itens = document.querySelectorAll(".list-group-item");
    const msg = document.getElementById("msgSessoes");

    itens.forEach(i => i.remove());

    msg.innerHTML = `
        <div class="alert alert-danger">
            Todas as sessões foram encerradas!
        </div>
    `;
}

async function salvarPerfil() {

    const perfil = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        telefone: document.getElementById("telefone").value,
        nascimento: document.getElementById("nascimento").value,
        endereco: document.getElementById("endereco").value,
        cidade: document.getElementById("cidade").value,
        estado: document.getElementById("estado").value,
        cep: document.getElementById("cep").value
    };

    if (!perfil.nome || !perfil.email || !perfil.telefone || !perfil.nascimento) {
        alert("Preencha os campos obrigatórios!");
        return;
    }

    const id = 1;

    const resposta = await fetch(`http://localhost:8080/alunos/atualizar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(perfil)
    });

    if (resposta.ok) {
        alert("Perfil atualizado com sucesso!");
    } else {
        alert("Erro ao salvar perfil!");
    }
}

    

// EXECUTA AO ABRIR A PÁGINA

window.addEventListener(
    "DOMContentLoaded",
    carregarPerfil
);