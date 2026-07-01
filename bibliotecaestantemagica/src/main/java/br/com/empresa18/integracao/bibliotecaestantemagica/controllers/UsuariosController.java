package br.com.empresa18.integracao.bibliotecaestantemagica.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
	@RequestMapping("/Usuarios")
	@CrossOrigin("*")
	public class UsuariosController{
	
		
	@Autowired
	private UsuariosRepository usuariosRepository;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	public UsuariosController() {
		// TODO Auto-generated constructor stub
	}

	//BUSCAR TODOS
		@GetMapping("/listarTodos")
		@ResponseStatus(HttpStatus.OK)
		public List<UsuariosEntity> listarTodos(){
			return usuariosRepository.findAll();
		}

		
	// BUSCAR POR ID
	@GetMapping("/listarporId/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<UsuariosEntity> buscarPorID(@PathVariable Long id){
		return usuariosRepository.findById(id);
			
		}
		

	// GRAVAR
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<?> gravarUsuarios(@RequestBody UsuariosEntity usuarios) {

	    // Verifica se já existe um usuário com o mesmo RA
	    if (usuariosRepository.existsByRa(usuarios.getRa())) {
	        return ResponseEntity
	                .status(HttpStatus.BAD_REQUEST)
	                .body("Já existe um usuário cadastrado com o RA: " + usuarios.getRa());
	    }

	    usuarios.setSenha(encoder.encode(usuarios.getSenha()));

	    UsuariosEntity usuarioSalvo = usuariosRepository.save(usuarios);

	    return ResponseEntity.ok(usuarioSalvo);
	}


	// ATUALIZAR
	@PutMapping("/atualizar/{id}")
	@ResponseStatus(HttpStatus.OK)
	public UsuariosEntity atualizarUsuarios(@RequestBody UsuariosEntity usuarios, @PathVariable Long id) {

	    if (usuariosRepository.existsById(id)) {

	        UsuariosEntity usuario = usuariosRepository.findById(id).get();

	        usuario.setNome(usuarios.getNome());
	        usuario.setEmail(usuarios.getEmail());
	        usuario.setTelefone(usuarios.getTelefone());

	        return usuariosRepository.save(usuario);
	    }

	    return null;
	}


	// DELETAR
	@DeleteMapping("/deletar/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public String deletarUsuarios(@PathVariable Long id) {
		if(usuariosRepository.existsById(id)) {
			usuariosRepository.deleteById(id);
			return "Usuario deletado";
		}
		
			return "Usuario não encontrado";
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UsuariosEntity usuarioLogin) {

	    Optional<UsuariosEntity> usuario = usuariosRepository.findByEmail(usuarioLogin.getEmail());

	    if (usuario.isPresent()) {

	        UsuariosEntity usuarioEncontrado = usuario.get();

	        if (encoder.matches(usuarioLogin.getSenha(), usuarioEncontrado.getSenha())) {

	            return ResponseEntity.ok(usuarioEncontrado);

	        }

	    }

	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha inválidos.");
	}

	// BUSCAR POR RA
	@GetMapping("/buscarra/{ra}")
	public ResponseEntity<UsuariosEntity> buscarPorRa(@PathVariable String ra) {

	    UsuariosEntity usuario = usuariosRepository.findByRa(ra);

	    if (usuario == null) {
	        return ResponseEntity.notFound().build();
	    }

	    return ResponseEntity.ok(usuario);
	}
	
	}
