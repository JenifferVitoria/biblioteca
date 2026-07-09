const API_CADASTRAR ="http://localhost:8000/livros/salvar";
const API_BUSCAR_TODOS ="http://localhost:8000/livros/listartodos";
const API_BUSCAR_LIVRO ="http://localhost:8000/livros/BuscarPorTipo";
const API_BUSCAR_ID = "http://localhost:8000/livros/listarid";

let notaAvaliacao = 0;
let editandoid = null;

	// SALVAR
	async function salvarAvaliacao() {

		if (validarCampo()=== true){


	    await fetch(API_CADASTRAR, {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json"
	        },
	        body: JSON.stringify(salvarAvaliacao)
	    });

	  //  alert("Avaliação salva com sucesso!");

	    fecharModal();
	    limparFormulario();
		};
		console.log(salvarAvaliacao);
	}

	 function validarCampo()  {

	
		const texto = document.getElementById("comentario").value;
			

		if (notaAvaliacao === 0) {
		      alert("Selecione uma nota para o livro.");
		      return false;
		  }
			if (texto.length > 500){
												
						
					alert("O maximo de carcters é 500")
						return false;
				}
					
				return true;
						
		}
		
		
		
		// ESTRELAS
		function hoverStar(star, nota){

		    const estrelas = star.parentElement.querySelectorAll(".star");

		    estrelas.forEach((estrela,index)=>{

		        if(index < nota){
		            estrela.classList.add("hover");
		        }else{
		            estrela.classList.remove("hover");
		        }

		    });

		}

		function limparHover(star){

		    const estrelas = star.parentElement.querySelectorAll(".star");

		    estrelas.forEach(estrela=>{

		        estrela.classList.remove("hover");

		    });

		}

		function avaliar(star, nota){

		    notaAvaliacao = nota;

		    const estrelas = star.parentElement.querySelectorAll(".star");

		    estrelas.forEach((estrela,index)=>{

		        if(index < nota){
		            estrela.classList.add("active");
		        }else{
		            estrela.classList.remove("active");
		        }

		    });

		    const textos = [
		        "",
		        "Péssimo 😞",
		        "Ruim 😕",
		        "Bom 🙂",
		        "Muito Bom 😍",
		        "Excelente ⭐"
		    ];

		    document.getElementById("textoNota").innerHTML = textos[nota];

		}
		
		
		function abrirModal(nomeLivro){

		    document.getElementById("nomeLivro").innerHTML = nomeLivro;

		    document.getElementById("modalAvaliacao").style.display="flex";

		}

		function fecharModal(){

		    document.getElementById("modalAvaliacao").style.display="none";

		}
		
		function limparFormulario() {

		    notaAvaliacao = 0;

		    document.getElementById("comentario").value = "";

		    document.getElementById("contador").innerHTML = "0 / 500 caracteres";

		    document.getElementById("textoNota").innerHTML = "Clique nas estrelas";

		    document.querySelectorAll(".star").forEach(star => {
		        star.classList.remove("active");
		        star.classList.remove("hover");
		    });

		}
		
		async function salvarLivro(){

			const titulo = document.getElementById("titulo").value;
			const autor = document.getElementById("autor").value;
			const editora = document.getElementById("editora").value;
			const anoPublicacao = document.getElementById("anoPublicacao").value;
			const isbn = document.getElementById("isbn").value;
			const genero = document.getElementById("genero").value;
			const codigoAcervo = document.getElementById("codigoAcervo").value;

			const formData = new FormData();
			
			formData.append("titulo", titulo);
			formData.append("autor", autor);
			formData.append("editora", editora);
			formData.append("anoPublicacao", anoPublicacao);
			formData.append("isbn", isbn);
			formData.append("genero", genero);
			formData.append("codigoAcervo", codigoAcervo);
			formData.append("id", editandoid); 


		    if(editandoid){

				await fetch(`${API_ATUALIZAR}/${id}`, {

				        method: "PUT",

				        body: formData

				    });
					
					window.Location.href="acervo.html";
				
		    } else {

			    await fetch(API_SALVAR, {
			
			        method: "POST",
			
			        body: formData
			
			    });

			}

		   limparFormulario();
		   
		};
		
		
		async function carregarDadosDoLivro (){

			const parametros = new URLSearchParams(window.location.search);
			const id = parametros.get('id'); // Retorna "camisa"	
			console.log(id);
		const response = await fetch(`${API_BUSCAR_ID}/${id}`);
		const reserva = await response.json();
	console.log(reserva);

	console.log(document.getElementById('nomeLivro').innerHTML);
		//ATRIBUI CADA INPUT AS INFORMAÇÕES
		document.getElementById('titulo').innerHTML=reserva.titulo;
		document.getElementById('autor').innerHTML=reserva.autor;
		document.getElementById('editora').innerHTML=reserva.editora;
		document.getElementById('anoPublicacao').innerHTML=reserva.anoPublicacao;
		document.getElementById('isbn').innerHTML=reserva.isbn;
		document.getElementById('genero').innerHTML=reserva.genero;
		document.getElementById('disponibilidade').innerHTML=reserva.disponivel;
		document.getElementById('nomeLivro').innerHTML=reserva.titulo;
		document.getElementById('nomeAutor').innerHTML=reserva.autor;
		document.getElementById('imagem').src="/img/"+reserva.imagem;
	
		}
			document.addEventListener("DOMContentLoaded",()=>{
				carregarDadosDoLivro();
		});