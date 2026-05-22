// Ver disponibilidade
function verificarLivro(){
	
	fetch("/disponibilidade")
	.then(response => response.text())
	.then(data =>{
		
		document.getElementById("resultado").innerHTML = data;
	});
	
}

//Reservar Livro
function reservarLivro(){
	
	fetch ("/reservar",{
		
		method:"POST"
	})
	.then (response => reponse.text())
	.then(data =>{
		
		document.getElementById("resultado").innerHTML = data;
	})
}