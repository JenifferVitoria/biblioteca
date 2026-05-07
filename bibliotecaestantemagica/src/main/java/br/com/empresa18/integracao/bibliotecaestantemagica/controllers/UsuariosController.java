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

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.UsuariosEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.UsuariosRepository;


	@RestController
	@RequestMapping("usuarios")
	@CrossOrigin("*")
	public class UsuariosController{
	@Autowired
	private UsuariosRepository usu;

	//BUSCAR TODOS
		@GetMapping("/listarTodos")
		@ResponseStatus(HttpStatus.OK)
		public List<UsuariosEntity> listarTodos(){
			return usu.findAll();
		}

	// BUSCAR POR ID
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<UsuariosEntity> buscarPorID(@PathVariable Long id){
		return usu.findById(id);
			
		}
		

	// GRAVAR
	@PostMapping("/salvar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public UsuariosEntity gravarUsuarios(@RequestBody UsuariosEntity usuarios) {
	return usu.save(usuarios);
	}



	// ATUALIZAR
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizarUsuarios(@PathVariable Long id, @RequestBody UsuariosEntity usuarios) {
		if(usu.existsById(id)) {
			usuarios.setId(id);
			usu.save(usuarios);
			return "Atualizado";
		}
		return "Não atualizado";
	}


	// DELETAR
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String deletarUsuarios(@PathVariable Long id) {
		if(usu.existsById(id)) {
			usu.deleteById(id);
			return "Usuario deletado";
		}
		
			return "Usuario não encontrado";
	}



	}

