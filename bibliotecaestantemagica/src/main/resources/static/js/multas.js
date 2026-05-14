
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
