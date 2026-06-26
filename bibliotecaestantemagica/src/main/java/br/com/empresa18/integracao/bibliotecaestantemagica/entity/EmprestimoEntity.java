package br.com.empresa18.integracao.bibliotecaestantemagica.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.*;

@Entity
@Table(name = "Emprestimo")
public class EmprestimoEntity implements Serializable {
	
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private LocalDate dataEmprestimo;
    private LocalDate dataDevolucao;
    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idLocador")
    private UsuariosEntity locador;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idLocatario")
    private UsuariosEntity locatario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idLivro")
    private LivroEntity livro;

    
    
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    public void setDataDevolucao(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UsuariosEntity getLocador() {
        return locador;
    }

    public void setLocador(UsuariosEntity locador) {
        this.locador = locador;
    }

    public UsuariosEntity getLocatario() {
        return locatario;
    }

    public void setLocatario(UsuariosEntity locatario) {
        this.locatario = locatario;
    }

    public LivroEntity getLivro() {
        return livro;
    }

    public void setLivro(LivroEntity livro) {
        this.livro = livro;
    }
}