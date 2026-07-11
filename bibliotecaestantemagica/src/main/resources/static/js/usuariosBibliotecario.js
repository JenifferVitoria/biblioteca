const API_BUSCAR_TODOS = "http://192.168.10.22:8011/Usuarios/listarTodos";
const API_SALVAR = "http://192.168.10.22:8011/Usuarios/salvar";
const API_BUSCAR_POR_ID = "http://192.168.10.22:8011/Usuarios/listarporId";
const API_ATUALIZAR = "http://192.168.10.22:8011/Usuarios/atualizar";
const API_DELETAR = "http://192.168.10.22:8011/Usuarios/deletar";


let editandoId = null;



//// LIMPAR FORMULÁRIO

function limparFormulario() {

    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
    document.getElementById("endereco").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("status").value = "true";

    editandoId = null;

}



//// MODAL

function abrirModal() {

    const modal = new bootstrap.Modal(
        document.getElementById("usuarioModal")
    );

    modal.show();

}


function fecharModal() {

    const modalElement =
        document.getElementById("usuarioModal");

    const modal =
        bootstrap.Modal.getInstance(modalElement);


    if (modal) {

        modal.hide();

    }

}



//// INICIALIZAÇÃO

document.addEventListener("DOMContentLoaded", () => {

    listarTodos();

});



//// LISTAR TODOS

async function listarTodos() {


    const response = await fetch(API_BUSCAR_TODOS);


    const usuarios = await response.json();


    const tbody =
        document.getElementById("usuarios");


    tbody.innerHTML = "";


    usuarios.forEach(usuario => {


        tbody.innerHTML += `

        <tr>

            <td>${usuario.id}</td>

            <td>${usuario.email}</td>

            <td>${usuario.telefone}</td>

            <td>${usuario.tipo}</td>

            <td>
                ${usuario.status ? "Ativo" : "Inativo"}
            </td>

            <td>

                <button 
                    class="btn btn-warning btn-sm"
                    onclick="editar(${usuario.id})">

                    Editar

                </button>


                <button 
                    class="btn btn-danger btn-sm"
                    onclick="deletar(${usuario.id})">

                    Deletar

                </button>

            </td>

        </tr>

        `;

    });

}



//// SALVAR

async function salvar() {


    const usuario = {


        nome: document.getElementById("nome").value,

        cpf: document.getElementById("cpf").value,

        email: document.getElementById("email").value,

        telefone: document.getElementById("telefone").value,

        endereco: document.getElementById("endereco").value,

        dataNascimento:
            document.getElementById("dataNascimento").value,

        tipo:
            document.getElementById("tipo").value,

        senha:
            document.getElementById("senha").value,

        status:
            document.getElementById("status").value === "true"

    };


    let url = API_SALVAR;

    let metodo = "POST";


    if (editandoId != null) {

        url = `${API_ATUALIZAR}/${editandoId}`;

        metodo = "PUT";

    }


    const response = await fetch(url, {


        method: metodo,


        headers: {

            "Content-Type": "application/json"

        },


        body: JSON.stringify(usuario)


    });



    if (response.ok) {


        alert("Usuário salvo com sucesso!");


        fecharModal();

        limparFormulario();

        listarTodos();


    } else {


        alert("Erro ao salvar usuário.");

    }


}



//// DELETAR

async function deletar(id) {


    if (!confirm("Deseja realmente excluir?")) {

        return;

    }


    const response = await fetch(

        `${API_DELETAR}/${id}`,

        {

            method: "DELETE"

        }

    );


    if (response.ok) {


        alert("Usuário deletado com sucesso!");


        listarTodos();


    } else {


        alert("Erro ao excluir usuário.");

    }

}



//// EDITAR

async function editar(id) {


    const response = await fetch(

        `${API_BUSCAR_POR_ID}/${id}`

    );


    const usuario = await response.json();


    editandoId = id;



    document.getElementById("nome").value =
        usuario.nome;


    document.getElementById("cpf").value =
        usuario.cpf;


    document.getElementById("email").value =
        usuario.email;


    document.getElementById("telefone").value =
        usuario.telefone;


    document.getElementById("endereco").value =
        usuario.endereco;


    document.getElementById("dataNascimento").value =
        usuario.dataNascimento;


    document.getElementById("tipo").value =
        usuario.tipo;


    document.getElementById("senha").value =
        usuario.senha;


    document.getElementById("status").value =
        usuario.status;


    abrirModal();

}