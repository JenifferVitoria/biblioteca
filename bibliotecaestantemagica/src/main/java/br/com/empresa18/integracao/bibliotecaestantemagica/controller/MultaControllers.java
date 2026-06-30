package br.com.empresa18.integracao.bibliotecaestantemagica.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.MultaEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.MultaRepository;

@RestController
@RequestMapping("/multas")
@CrossOrigin("*")
public class MultaControllers {

    @Autowired
    private MultaRepository multarep;

    @GetMapping("/listartodos")
    public List<MultaEntity> listarTodos() {
        return multarep.findAll();
    }
}