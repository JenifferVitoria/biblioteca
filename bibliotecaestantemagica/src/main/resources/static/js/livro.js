const API_RESERVAR = "http://localhost:8000/livro/reservar";


document.getElementById("btnReservar")
.addEventListener("click",reservarLivro);

function reservarLivro{
	
	const idLivro = document.getElementById("livroId").value;
	fetch("http://localhost:8000/livro/reservar/"+livroId,{
		
		method: "POST"
		
	});
	
	then(response =>{
		if(response.ok){
			
			alert("Livro reservado com sucesso!");
			
			
		}else{
			
			alert ("Livro indisponível!");
			
		}
		
	});
	
	 (error => {
		
		alert("Erro ao reservar!");
		
	});
	
	
	
}

