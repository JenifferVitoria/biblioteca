
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