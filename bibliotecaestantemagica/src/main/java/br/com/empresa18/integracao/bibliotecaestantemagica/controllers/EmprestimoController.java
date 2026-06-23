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
import br.com.empresa18.integracao.bibliotecaestantemagica.entity.EmprestimoEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.EmprestismoRepository;

@RestController
@RequestMapping("/emprestimos")
@CrossOrigin("*")
public class EmprestimoController {

    @Autowired
    private EmprestismoRepository empresRepo;

    @GetMapping("/listartodos")
    @ResponseStatus(HttpStatus.OK)
    public List<EmprestimoEntity> listarEmprestimo() {

        return empresRepo.findAll();
    }

    @GetMapping("/listarid/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Optional<EmprestimoEntity> listarPorId(
            @PathVariable Long id) {

        return empresRepo.findById(id);
    }

    @PostMapping("/salvar")
    @ResponseStatus(HttpStatus.CREATED)
    public EmprestimoEntity cadastrar(
            @RequestBody EmprestimoEntity emprestimo) {

        return empresRepo.save(emprestimo);
    }

    @DeleteMapping("/deletar/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public String deletar(@PathVariable long id) {

        if (empresRepo.existsById(id)) {

            empresRepo.deleteById(id);

            return "Deletado";
        }

        return "Não encontrado";
    }

    @PutMapping("/atualizar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EmprestimoEntity atualizar(
            @PathVariable Long id,
            @RequestBody EmprestimoEntity emprestimo) {

        if (empresRepo.existsById(id)) {

            emprestimo.setId(id);

            return empresRepo.save(emprestimo);
        }

        return null;
    }

    @PutMapping("/renovar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EmprestimoEntity renovar(
            @PathVariable Long id) {

        Optional<EmprestimoEntity> emprestimoOpt =
                empresRepo.findById(id);

        if (emprestimoOpt.isPresent()) {

            EmprestimoEntity emprestimo =
                    emprestimoOpt.get();

            emprestimo.setDataDevolucao(
                    emprestimo.getDataDevolucao().plusDays(7)
            );

            return empresRepo.save(emprestimo);
        }

        return null;
    }
}