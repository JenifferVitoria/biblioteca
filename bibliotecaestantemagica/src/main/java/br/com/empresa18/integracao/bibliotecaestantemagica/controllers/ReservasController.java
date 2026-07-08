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
import br.com.empresa18.integracao.bibliotecaestantemagica.entity.ReservasEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.ReservasRepository;

@RestController
@RequestMapping("/reservas")
@CrossOrigin("*")
public class ReservasController {
	// CRIANDO USUARIO
	@Autowired
	private ReservasRepository repoReser;

	// LISTANDO TODOS
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List<ReservasEntity> BuscarTodos() {

		return repoReser.findAll();
	}

	// LISTANDO USUARIOS POR ID
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<ReservasEntity> buscarPorID(@PathVariable Long id) {

		return repoReser.findById(id);
	}

	// PUT ATUALIZAR USUARIO
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizar(@PathVariable long id, @RequestBody ReservasEntity devoo) {
		if (repoReser.existsById(id)) {
			devoo.setId(id);
			repoReser.save(devoo);

			return "Salvo";
		}
		return "Não Salvo";
	}

	// METODO DELETAR
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletarDevolucao(@PathVariable Long id) {

		if (repoReser.existsById(id)) {
			repoReser.deleteById(id);
		}
	}

	// SALVANDO USUARIO
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public ReservasEntity gravar(@RequestBody ReservasEntity devoo) {

		return repoReser.save(devoo);
	}

}
