const API_LISTAR_ATRASADOS ="http://192.168.10.22:8011/emprestimos/atrasados"

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

    const response = await fetch( API_LISTAR_ATRASADOS);
    listaMultas = await response.json();

    const tbody = document.getElementById("tabelaMultas");
    tbody.innerHTML = "";

    listaMultas.forEach((multa ) => {

        const tr = document.createElement("tr");
		
		console.log(multa.dataEmprestimo);
		
		let dataDevolucao = adicionarDiasFormatado(multa.dataEmprestimo, 10);
		
		console.log(dataDevolucao);
		
		console.log("Hoje"+new Date());
		
		let dias = calcularDias(new Date(), dataDevolucao) *-1;
		
		console.log(dias)
		
        tr.innerHTML = `
         	<td>${multa.livro.titulo}</td>
			<td>${multa.dataEmprestimo}</td>
			<td>${multa.dataDevolucao}</td>
            <td>${dias} dias</td>
            <td>${"R$ "+dias*1.5}</td>
            <td>${multa.status}</td>
            <td>

			<button class="btn btn-success btn-sm btn-pagar"
			    onclick="abrirModalPix(${dias*1.5})">
			    <i class="bi bi-qr-code"></i>
			    Pagar PIX
			</button>


            </td>
        `;

        tbody.appendChild(tr);
    });
}

function adicionarDiasFormatado(data, dias) {
  const novaData = new Date(data);
  novaData.setDate(novaData.getDate() + dias);
  
  // Extrai ano, mês e dia com dois dígitos
  const ano = novaData.getFullYear();
  const mes = String(novaData.getMonth() + 1).padStart(2, '0');
  const dia = String(novaData.getDate()).padStart(2, '0');
  
  return `${ano}-${mes}-${dia}`;
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


function calcularDias(dataInicial, dataFinal) {
  // Transforma as datas em objetos do tipo Data
  const inicio = new Date(dataInicial);
  const fim = new Date(dataFinal);
  
  // Calcula a diferença em milissegundos
  const diferencaTempo = fim - inicio;
  
  // Total de milissegundos em um dia: 1000ms * 60s * 60m * 24h
  const umDia = 1000 * 60 * 60 * 24;
  
  // Divide o tempo e arredonda para obter os dias exatos
  return Math.round(diferencaTempo / umDia);
}





