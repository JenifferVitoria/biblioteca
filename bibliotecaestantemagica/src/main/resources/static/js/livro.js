
let notaAvaliacao = 0;


	async function salvarLivro(){
		
	}


	// SALVAR
	async function salvarAvaliacao() {

		if (validarCampo()=== true){
			
			

		
		const avaliacao = {

			fornecedor : {
				id : document.getElementById("select").value
			},
			
	        dataDaAvaliacao: document.getElementById("dataDaAvaliacao").value,

	        qualidadeDasPecas: qualidadeDasPecas,

	        prazoDeEntrega: prazoDeEntrega,

	        atendimento: atendimento,

	        preco: preco,

	        observacoes: document.getElementById("observacoes").value
	    };
		


	    await fetch(API_CADASTRAR, {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json"
	        },
	        body: JSON.stringify(avaliacao)
	    });

	  //  alert("Avaliação salva com sucesso!");

	    fecharModal();
	    limparFormulario();
	    listarFornecedor();     
		};
	}

	 function validarCampo()  {

		notaAvaliacao = nota;
		const select = document.getElementById("select").value;
		const observacoes = document.getElementById("observacoes").value;
			


			if (observacoes.length > 500){
												
						
					alert("O maximo de carcters é 500")
						return false;
				}
					
				return true;
						
		}
		
		
		
		// ESTRELAS
		function hoverStar(star, nota) {

		    const estrelas = star.parentElement.querySelectorAll(".star");

		    estrelas.forEach((item, index) => {

		        if (index < nota) {
		            item.classList.add("hover");
		        } else {
		            item.classList.remove("hover");
		        }

		    });
		}

		function limparHover(star) {

		    const estrelas = star.parentElement.querySelectorAll(".star");

		    estrelas.forEach(item => {
		        item.classList.remove("hover");
		    });
		}

		function avaliar(star, nota) {

		    const rating = star.parentElement;

		    const estrelas = rating.querySelectorAll(".star");

		    estrelas.forEach((item, index) => {

		        if (index < nota) {
		            item.classList.add("active");
		        } else {
		            item.classList.remove("active");
		        }

		    });

		    const campo = rating.dataset.campo;

		    switch (campo) {

		        case "qualidadeDasPecas":
		            qualidadeDasPecas = nota;
		            break;

		       
		    }

		    console.log(
		        "Qualidade:", qualidadeDasPecas);
		}
		
		function abrirModal(nomeLivro){

		    document.getElementById("nomeLivro").innerHTML = nomeLivro;

		    document.getElementById("modalAvaliacao").style.display="flex";

		}

		function fecharModal(){

		    document.getElementById("modalAvaliacao").style.display="none";

		}

