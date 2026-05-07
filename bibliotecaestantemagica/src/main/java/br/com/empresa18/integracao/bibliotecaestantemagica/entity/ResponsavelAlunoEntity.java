package br.com.empresa18.integracao.bibliotecaestantemagica.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "ResponsavelAluno")
public class ResponsavelAlunoEntity {
	@Id
	@GeneratedValue (strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "nome", length = 150, nullable = false)
	private String nome;

	@Column (name = "cpf", length = 11, nullable = false)
	private int cpf;
	
	@ManyToOne
	@JoinColumn(name = "idUsuario", nullable = false)
	private UsuariosEntity usuario;
	
//// GETTERS E SETTERS
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public int getCpf() {
		return cpf;
	}

	public void setCpf(int cpf) {
		this.cpf = cpf;
	}


}
