const API_SALVAR ="http://192.168.10.22:8011/alunos/salvar";	

function voltarPagina() {
    window.location.href = "dashboardbibliotecario.html";
}
	
function limparFormulario(){
	
	document.getElementById("nomeCompleto").value="";
	document.getElementById("cpf").value="";
	document.getElementById("email").value="";
	document.getElementById("telefone").value="";
	document.getElementById("endereco").value="";
	document.getElementById("dataNascimento").value="";
	document.getElementById("senha").value="";
	document.getElementById("confirmarSenha").value="";
	document.getElementById("tipoUsuario").value="";
	
}


async function salvarAluno(){
	
	console.log(salvarAluno);
	
	const nomeCompleto = document.getElementById("nomeCompleto").value;
	const cpf = document.getElementById("cpf").value;
	const email = document.getElementById("email").value;
	const telefone = document.getElementById("telefone").value;
	const endereco = document.getElementById("endereco").value;
	const dataNascimento = document.getElementById("dataNascimento").value;
	const senha = document.getElementById("senha").value;
	const confirmarSenha = document.getElementById("confirmarSenha").value;
	const tipoUsuario = document.getElementById("tipoUsuario").value;
	
	const response = 
		await fetch (API_SALVAR,{
			method:"POST",
			headers: {
			 "Content-Type": "application/json"
	 },
	  body: JSON.stringify(aluno)
		});

	
	
}

// validar senha
async function confirmandoSenha() {
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha === confirmarSenha) {
        console.log("As senhas são iguais!");
        return true;
    } else {
        console.log("As senhas são diferentes!");
        alert("As senhas não coincidem.");
        return false;
    }
	
}



//validando cpf//

function validaCPF(cpf) {
	
	console.log("kkkkkkk");
  var Soma = 0
  var Resto

  var strCPF = String(cpf.value).replace(/[^\d]/g, '')
  
  if (strCPF.length !== 11)
     alert("CPF incorreto")
  
  if ([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    ].indexOf(strCPF) !== -1)
    alert("CPF incorreto")

  for (i=1; i<=9; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(9, 10)) )
    alert("CPF incorreto")

  Soma = 0

  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(10, 11) ) )
    alert("CPF incorreto")

}




