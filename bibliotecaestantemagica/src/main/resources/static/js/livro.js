const API_CADASTRAR ="http://localhost:8000/livros/salvar";


let notaAvaliacao = 0;

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
