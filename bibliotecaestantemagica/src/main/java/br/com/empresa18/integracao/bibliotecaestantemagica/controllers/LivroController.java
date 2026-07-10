package br.com.empresa18.integracao.bibliotecaestantemagica.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.LivroEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.LivroRepository;


@RestController
@RequestMapping("/livros")
@CrossOrigin("*")
public class LivroController {

    @Autowired
    private LivroRepository livroRepo;


    // LISTAR TODOS
    @GetMapping("/listartodos")
    @ResponseStatus(HttpStatus.OK)
    public List<LivroEntity> listarLivro() {

        return livroRepo.findAll();

    }


    // BUSCAR POR ID
    @GetMapping("/listarid/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<LivroEntity> listarPorId(@PathVariable Long id) {

        return livroRepo.findById(id);

    }


    // BUSCAR LIVRO
    @GetMapping("/buscar/{genero}/{titulo}/{autor}/{isbn}")
    @ResponseStatus(HttpStatus.OK)
    public List<LivroEntity> buscar(
            @PathVariable String genero,
            @PathVariable String titulo,
            @PathVariable String autor,
            @PathVariable String isbn) {


        return livroRepo.findByGeneroOrTituloOrAutorOrIsbnContainingIgnoreCase(
                genero,
                titulo,
                autor,
                isbn);

    }


    // CADASTRAR
    @PostMapping("/salvar")
    @ResponseStatus(HttpStatus.CREATED)
    public LivroEntity cadastrar(@RequestBody LivroEntity livro) {

        return livroRepo.save(livro);

    }


    // ATUALIZAR
    @PutMapping("/atualizar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public LivroEntity atualizar(
            @PathVariable Long id,
            @RequestBody LivroEntity livro) {


        livro.setId(id);

        return livroRepo.save(livro);

    }


    // RESERVAR
    @PutMapping("/reservar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public LivroEntity reservar(@PathVariable Long id) {


        Optional<LivroEntity> livros = livroRepo.findById(id);


        if (livros.isPresent()) {


            LivroEntity livro = livros.get();


            livro.setStatus("RESERVADO");


            return livroRepo.save(livro);

        }


        return null;

    }


    // DISPONIBILIZAR LIVRO
    @PutMapping("/disponibilizar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public LivroEntity disponibilizar(@PathVariable Long id) {


        Optional<LivroEntity> livros = livroRepo.findById(id);


        if (livros.isPresent()) {


            LivroEntity livro = livros.get();


            livro.setStatus("DISPONIVEL");


            return livroRepo.save(livro);

        }


        return null;

    }


    // DELETAR
    @DeleteMapping("/deletar/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public String deletar(@PathVariable Long id) {


        if (livroRepo.existsById(id)) {


            livroRepo.deleteById(id);


            return "Livro deletado com sucesso.";

        }


        return "Livro não encontrado.";

    }



	// PUT ATUALIZAR RESERVA
	@PutMapping("/atualizarStatus/{id}/{status}")
	@ResponseStatus(HttpStatus.OK)
	public String livro (@PathVariable long id, @RequestBody LivroEntity livro, @PathVariable String status) {
	
		 if (livroRepo.existsById(id)){
			 livro.setId(id);
			 livro.setStatus(status);
			 
			 livroRepo.save(livro);	
	        	
				return "Livro Reservado";
	       }
			return "Não Salvo";
		}

	
	
	@GetMapping("/BuscarPorTitulo/{titulo}")
	@ResponseStatus(HttpStatus.OK)	    
	public List<LivroEntity> buscarPorTitulo(@PathVariable String titulo) {
	    return livroRepo.findByTituloContainingIgnoreCase(titulo);
	}

	
	@PostMapping("/reservar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public String reservar(@PathVariable long id) {

	    LivroEntity livro = livroRepo.findById(id);

	    if (livro == null) {
	        return "Livro não encontrado.";
	    }

	    if ("Reservado".equalsIgnoreCase(livro.getStatus())) {
	        return "Livro já está reservado.";
	    }

	    livro.setStatus("Reservado");

	    livroRepo.save(livro);

	    return "Livro reservado com sucesso!";
	}

}




