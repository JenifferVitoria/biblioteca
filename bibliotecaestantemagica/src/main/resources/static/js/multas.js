const API_EMPRESTIMOS_TODOS = "http://localhost:8000/emprestimos/listartodos";


let listaMultas = [];
let listaEmprestimos = [];

let editandoId = null;


// LIMPAR FORMULARIO// 

function limparFormulario() {
		document.getElementById("valor").value="";
		document.getElementById("diasAtraso").value="";
		document.getElementById("dataGeracao").value="";
		document.getElementById("paga").value="";

    editandoId = null;
}


// ABRIR MODAL//

function abrirModal() {
    const modal = new bootstrap.Modal(document.getElementById("pixModal"));
    modal.show();
}


// FECHAR MODAL//

function fecharModal() {
    const modalElement = document.getElementById("pixModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}


// INICIALIZAR//

document.addEventListener("DOMContentLoaded", () => {
	console.log("kkkkk");
    listarMultas();
});


// LISTAR MULTAS//



async function listarMultas() {

    const response = await fetch(API_EMPRESTIMOS_TODOS);
    listaMultas = await response.json();

    const tbody = document.getElementById("tabelaMultas");
    tbody.innerHTML = "";

    listaMultas.forEach((multa ) => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${multa.Livro}</td>
            <td>${multa.DiasdeAtraso} dias</td>
            <td>${multa.valor}</td>
            <td>${multa.Status}</td>
            <td>

                <button class="btn btn-primary btn-sm"
                    onclick="abrirModalPix(${5.00})">

                </button>


            </td>
        `;

        tbody.appendChild(tr);
    });
}



function copiarCodigo(){

       let codigo =
        document.getElementById("pixCode");

        codigo.select();
        codigo.setSelectionRange(0,99999);

         navigator.clipboard.writeText(
        codigo.value
);

         alert("Código PIX copiado!");

}



async function abrirModalPix(valor) {
        valor = parseFloat(valor);
		
    const response = await fetch(
        `http://localhost:8000/pix/gerar?valor=${valor.toFixed(2)}`);

    const data = await response.json();

        console.log(data);
         document.getElementById("pixCode").value = data.payload;

         document.getElementById("imgPix").src =
         "data:image/png;base64," + data.qrCodeBase64;

     let modal = new bootstrap.Modal(
        document.getElementById("pixModal")
);

modal.show();
}










