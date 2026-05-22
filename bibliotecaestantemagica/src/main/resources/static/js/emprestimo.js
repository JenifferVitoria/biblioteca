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


