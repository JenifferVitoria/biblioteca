const API_CADASTRAR ="http://localhost:8000/livros/salvar";
const API_BUSCAR_TODOS ="http://localhost:8000/livros/listartodos";
const API_BUSCAR_LIVRO ="http://localhost:8000/livros/BuscarPorTipo";


let notaAvaliacao = 0;
let editandoid = null;

	// SALVAR
	async function salvarLivros() {

		if (validarCampo()=== true){


	    await fetch(API_CADASTRAR, {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json"
	        },
	        body: JSON.stringify(salvarLivros)
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
		
		async function listarLivros (){
			
			const response = await fetch (API_BUSCAR_TODOS);
			
			const livros = await response.json();
			
			const tbody = document.querySelector("tbody");

			exercicios.forEach(livros => {

			const tr = document.createElement("tr");

			tr.innerHTML = `
			
				<td>${livros.imagem}</td>
				
				<td>${livros.tiulo}</td>
				
				<td>${livros.autpr}</td>

				<td>${livros.genero}</td>
				
				<td>${livros.isbn}</td>
				
				<td>${livros.disponivel}</td>
				
			

				`;

				tbody.appendChild(tr);

				});
			}
			
			async function buscarLivro(){
				
				let valor = document.getElementById("valorFiltro").value;
				let response ='';
				let livros ='';
				
				console.log('tipo');
				console.log(tipo);

				if (valor){
					
						if(tipo==="livro"){
							console.log('teste buscando');
					
							response = await fetch(`${API_BUSCAR_LIVRO}/${nomeFiltro}`);
						} 
						
				} else{
					response = await fetch(API_BUSCAR_LIVRO);	
					
				}
				
				const tbody = document.querySelector("tbody");

				exercicios.forEach(participante => {

				const tr = document.createElement("tr");

				tr.innerHTML = `

				<td>${livros.imagem}</td>

				<td>${livros.tiulo}</td>

				<td>${livros.autpr}</td>

				<td>${livros.genero}</td>

				<td>${livros.isbn}</td>

				<td>${livros.disponivel}</td>

					`;

					tbody.appendChild(tr);

					});
					

				}
				

				async function  salvarParticipante(){
					const participante = {
						capa: document.getElementById("imagem").value,
						titulo: document.getElementById("titulo").value,
						autor: document.getElementById("autor").value,
						genero: document.getElementById("genero").value,
						isbn: document.getElementById("isbn").value,
						status: document.getElementById("disponivel").value
						
					};
					const resposta = await fetch(
					     "http://localhost:8000/participantes/cadastrar",
					     {
					         method: "POST",
					         headers: {
					             "Content-Type": "application/json"
					         },
					         body: JSON.stringify(participante)
					     }
					 );

					 const mensagem = await resposta.text();

					 alert("Participante cadastrado com sucesso");
					
						
					 await listarParticipantes();
					limparFormulario();
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
