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

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.LivroEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.LivroRepository;

@RestController
@RequestMapping("/livros")
@CrossOrigin("*")
public class LivroController {
	
	@Autowired
	private LivroRepository livroRepo;
	
	@GetMapping("/listartodos")
	@ResponseStatus(HttpStatus.OK)
	public List< LivroEntity> listarAluno(){
		return livroRepo.findAll();
	}

	@GetMapping("/listarid/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<LivroEntity> listarPorId (@PathVariable Long id){
		return livroRepo.findById(id);
	}
	
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.CREATED)
	public LivroEntity cadsatrar (@RequestBody LivroEntity livro) {
		return livroRepo.save(livro);
	}
	
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String deletar (@PathVariable long id) {
		
		if(livroRepo.existsById(id)) {
			livroRepo.deleteById(id);
			return"Livro deletado";
		}
		return"Não";
	}
	
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String atualizarTabela(@PathVariable Long id, @RequestBody LivroEntity livro) {
		
		if(livroRepo.existsById(id)) {
			livro.setId(id);
			livroRepo.save(livro);
			return "Atualizado";
		}
		return "Não atulizado";
	}
	
}
