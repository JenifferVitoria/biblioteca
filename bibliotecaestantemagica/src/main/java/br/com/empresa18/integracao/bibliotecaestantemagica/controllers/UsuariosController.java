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
	@RequestMapping("/usuarios")
	@CrossOrigin("*")
	public class UsuariosController{
	@Autowired
	private UsuariosRepository usu;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	public UsuariosController() {
		// TODO Auto-generated constructor stub
	}

	//BUSCAR TODOS
		@GetMapping("/listartodos")
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
	@PostMapping("/salvar")
	@ResponseStatus(HttpStatus.OK)
	public UsuariosEntity gravarUsuarios(@RequestBody UsuariosEntity usuarios) {
	usuarios.setSenha(encoder.encode(usuarios.getSenha()));
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

	@PostMapping("/login")
	public ResponseEntity<UsuariosEntity> login(
	        @RequestBody UsuariosEntity usuarioLogin) {

	    // busca usuário por email
	    Optional<UsuariosEntity> usuario =
	            usu.findByEmail(usuarioLogin.getEmail());

	    // se encontrou usuário, verifica senha
	    if (usuario.isPresent()) {

	        UsuariosEntity usuarioEncontrado = usuario.get();

	       
			// compara senha enviada com senha armazenada (hash)
	        if (encoder.matches(
	                usuarioLogin.getSenha(),
	                usuarioEncontrado.getSenha())) {

	            return ResponseEntity.ok(usuarioEncontrado);
	        }
	    }

	    // se não encontrou usuário ou senha não bate, retorna 401
	    return ResponseEntity.status(401).build();
	}


	}

