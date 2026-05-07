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
import br.com.empresa18.integracao.bibliotecaestantemagica.entity.DevolucaoEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.DevolucaoRepository;


@RestController
@RequestMapping("/devolucoes")
@CrossOrigin("*")
public class DevolucaoController {

	// CRIANDO USUARIO
	@Autowired
	private DevolucaoRepository repoDevo;

	// LISTANDO TODOS
	@GetMapping("/listarTodos")
	@ResponseStatus(HttpStatus.OK)
	public List<DevolucaoEntity> BuscarTodos() {

		return repoDevo.findAll();
	}

	// LISTANDO USUARIOS POR ID
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<DevolucaoEntity> buscarDevolucaoPorID(@PathVariable Long id) {

		return repoDevo.findById(id);
	}

	// PUT ATUALIZAR USUARIO
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizarDevolucao(@PathVariable long id, @RequestBody DevolucaoEntity devoo) {
        if (repoDevo.existsById(id)){
        	devoo.setId(id);
        	repoDevo.save(devoo);	
        	
			return "Salvo";
       }
		return "Não Salvo";
	}

	// METODO DELETAR
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletarDevolucao(@PathVariable Long id) {

		if (repoDevo.existsById(id)) {
			repoDevo.deleteById(id);
		}
	}

	// SALVANDO USUARIO
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public DevolucaoEntity gravarDevolucao(@RequestBody DevolucaoEntity devoo) {

		return repoDevo.save(devoo);
	}

}//
