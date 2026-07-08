package br.com.empresa18.integracao.bibliotecaestantemagica.controllers;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.EmprestimoEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.EmprestismoRepository;


@RestController
@RequestMapping("/emprestimos")
@CrossOrigin("*")
public class EmprestimoController {

    @Autowired
    private EmprestismoRepository empresRepo;


    // LISTAR TODOS
    @GetMapping("/listartodos")
    @ResponseStatus(HttpStatus.OK)
    public List<EmprestimoEntity> listarEmprestimo() {
        return empresRepo.findAll();
    }

    // BUSCAR POR ID
    @GetMapping("/listarid/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<EmprestimoEntity> listarPorId(@PathVariable Long id) {
        return empresRepo.findById(id);
    }

    // CADASTRAR
    @PostMapping("/salvar")
    @ResponseStatus(HttpStatus.CREATED)
    public EmprestimoEntity cadastrar(@RequestBody EmprestimoEntity emprestimo) {
    		return empresRepo.save(emprestimo);
    }

    // ATUALIZAR
    @PutMapping("/atualizar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EmprestimoEntity atualizar(@PathVariable Long id, int usuario, String livro, @RequestBody EmprestimoEntity emprestimo) {

 

        return empresRepo.save(emprestimo);
    }

    // DEVOLVER
    @PutMapping("/devolver/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EmprestimoEntity devolver(@PathVariable Long id) {

        Optional<EmprestimoEntity> emprestimos = empresRepo.findById(id);

        if (emprestimos.isPresent()) {

            EmprestimoEntity emprestimo = emprestimos.get();

            emprestimo.setStatus("Devolvido");

            return empresRepo.save(emprestimo);
        }

        return null;
    }

    // RENOVAR
    @PutMapping("/renovar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EmprestimoEntity renovar(@PathVariable Long id) {

        Optional<EmprestimoEntity> emprestimos = empresRepo.findById(id);

        if (emprestimos.isPresent()) {

            EmprestimoEntity emprestimo = emprestimos.get();

            emprestimo.setStatus("Renovado");

            return empresRepo.save(emprestimo);
        }

        return null;
    }

    // DELETAR
    @DeleteMapping("/deletar/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public String deletar(@PathVariable Long id) {

        if (empresRepo.existsById(id)) {

            empresRepo.deleteById(id);

            return "Empréstimo deletado com sucesso.";
        }

        return "Empréstimo não encontrado.";
    }
    
    // BUSCAR EMPRESTIMO DE USUARIO
    @GetMapping("/listarusuario/{id}")
    public List<EmprestimoEntity> listarPorUsuario(@PathVariable Long id) {
        return empresRepo.findByUsuarioId(id);
    }
    
    
    @GetMapping("/listarra/{ra}")
    public List<EmprestimoEntity> listarPorRa(@PathVariable String ra) {
        return empresRepo.findByUsuarioRa(ra);
    }
    
    
    @GetMapping("/atrasados")
    public List<EmprestimoEntity> listarEmprestimosAtrasados() {
        return empresRepo.findEmprestimoAtrasados();
    }
 }