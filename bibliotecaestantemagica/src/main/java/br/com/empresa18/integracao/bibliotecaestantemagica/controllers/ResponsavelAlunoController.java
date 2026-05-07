package br.com.empresa18.integracao.bibliotecaestantemagica.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.empresa18.integracao.bibliotecamagica.entity.ResponsavelAlunoEntity;
import br.com.empresa18.integracao.bibliotecamagica.repository.ResponsavelAlunoRepository;


	@RestController
	@RequestMapping("/responsaveis")
	public class ResponsavelAlunoController{
	@Autowired
	private ResponsavelAlunoRepository usu;

	//BUSCAR TODOS
		@GetMapping("/listartodos")
		@ResponseStatus(HttpStatus.OK)
		public List<ResponsavelAlunoEntity> listarTodos(){
			return usu.findAll();
		}

	// BUSCAR POR ID
	@GetMapping("/listarporid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<ResponsavelAlunoEntity> buscarPorID(@PathVariable Long id){
		return usu.findById(id);
			
		}
		

	// GRAVAR
	@PostMapping ("/salvar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponsavelAlunoEntity gravarResponsavelAluno(@RequestBody ResponsavelAlunoEntity responsavelAluno) {
	return usu.save(responsavelAluno);
	}



	// ATUALIZAR
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizarResponsavelAluno(@PathVariable Long id, @RequestBody ResponsavelAlunoEntity responsavelAluno) {
		if(usu.existsById(id)) {
			responsavelAluno.setId(id);
			usu.save(responsavelAluno);
			return "Atualizado";
		}
		return "Não atualizado";
	}
		


	// DELETAR
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String deletarResponsavelAluno(@PathVariable Long id) {
		if(usu.existsById(id)) {
			usu.deleteById(id);
			return "Responsavel deletado";
		}
		
			return "Responsavel não encontrado";
	}



	}
