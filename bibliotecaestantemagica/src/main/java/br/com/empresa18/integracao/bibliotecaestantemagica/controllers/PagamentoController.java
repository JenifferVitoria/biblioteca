package br.com.empresa18.integracao.bibliotecaestantemagica.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.com.empresa18.integracao.bibliotecaestantemagica.entity.PagamentoEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.PagamentoRepository;


@RestController
@RequestMapping("/pagamentos")
@CrossOrigin("*")
public class PagamentoController {

	// CRIANDO USUARIO
	@Autowired
	private PagamentoRepository Pagar;

	// LISTANDO TODOS
	@GetMapping("/listarTodos")
	@ResponseStatus(HttpStatus.OK)
	public List<PagamentoEntity> BuscarTodosPagamentos() {

		return Pagar.findAll();
	}

	// LISTANDO USUARIOS POR ID
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<PagamentoEntity> buscarPagamentoPorID(@PathVariable Long id) {

		return Pagar.findById(id);
	}

	// PUT ATUALIZAR USUARIO
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizarPagamento(@PathVariable long id, @RequestBody PagamentoEntity paga) {

		 if (Pagar.existsById(id)){
			 paga.setId(id);
	        	Pagar.save(paga);	
	        	
				return "Salvo";
	       }
			return "Não Salvo";
		}

	// METODO DELETAR
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletarPagamento(@PathVariable Long id) {

		if (Pagar.existsById(id)) {
			Pagar.deleteById(id);
		}
	}

	// SALVANDO USUARIO
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public PagamentoEntity gravarPagamento(@RequestBody PagamentoEntity paga) {

		return Pagar.save(paga);
	}

}
