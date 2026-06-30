package br.com.empresa18.integracao.bibliotecaestantemagica.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.EmprestimoEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.entity.LivroEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.entity.UsuariosEntity;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.EmprestismoRepository;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.LivroRepository;
import br.com.empresa18.integracao.bibliotecaestantemagica.repository.UsuariosRepository;

@RestController
@RequestMapping("/emprestimos")
@CrossOrigin("*")
public class EmprestimoController {

    @Autowired
    private EmprestismoRepository empresRepo;

    @Autowired
    private UsuariosRepository usuariosRepository;

    @Autowired
    private LivroRepository livrosRepository;

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

        UsuariosEntity usuario = usuariosRepository
                .findById(emprestimo.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        LivroEntity livro = livrosRepository
                .findById(emprestimo.getLivro().getId())
                .orElseThrow(() -> new RuntimeException("Livro não encontrado."));

        emprestimo.setUsuario(usuario);
        emprestimo.setLivro(livro);

        return empresRepo.save(emprestimo);
    }

    // ATUALIZAR
    @PutMapping("/atualizar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EmprestimoEntity atualizar(@PathVariable Long id,
                                      @RequestBody EmprestimoEntity emprestimo) {

        if (!empresRepo.existsById(id)) {
            return null;
        }

        UsuariosEntity usuario = usuariosRepository
                .findById(emprestimo.getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        LivroEntity livro = livrosRepository
                .findById(emprestimo.getLivro().getId())
                .orElseThrow(() -> new RuntimeException("Livro não encontrado."));

        emprestimo.setId(id);
        emprestimo.setUsuario(usuario);
        emprestimo.setLivro(livro);

        return empresRepo.save(emprestimo);
    }

    // DEVOLVER
    @PutMapping("/devolver/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EmprestimoEntity devolver(@PathVariable Long id) {

        Optional<EmprestimoEntity> emprestimoOpt = empresRepo.findById(id);

        if (emprestimoOpt.isPresent()) {

            EmprestimoEntity emprestimo = emprestimoOpt.get();

            emprestimo.setStatus("Devolvido");

            return empresRepo.save(emprestimo);
        }

        return null;
    }

    // RENOVAR
    @PutMapping("/renovar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public EmprestimoEntity renovar(@PathVariable Long id) {

        Optional<EmprestimoEntity> emprestimoOpt = empresRepo.findById(id);

        if (emprestimoOpt.isPresent()) {

            EmprestimoEntity emprestimo = emprestimoOpt.get();

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
}