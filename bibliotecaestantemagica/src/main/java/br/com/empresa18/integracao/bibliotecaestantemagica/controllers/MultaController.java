package br.com.empresa18.integracao.bibliotecaestantemagica.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import br.com.empresa18.integracao.bibliotecaestantemagica.entity.MultaEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.MultaRepository;


	@RestController
	@RequestMapping("/multa")
	@CrossOrigin("*")
	public class MultaController {

	    @Autowired
	    private MultaRepository multaRepo;
	   

	    // LISTAR TODOS
	    @GetMapping("/listartodos")
	    @ResponseStatus(HttpStatus.OK)
	    public List<MultaEntity> listarMulta() {
	        return multaRepo.findAll();
	    }
}

	