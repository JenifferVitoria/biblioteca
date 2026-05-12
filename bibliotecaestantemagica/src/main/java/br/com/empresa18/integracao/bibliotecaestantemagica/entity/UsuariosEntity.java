package br.com.empresa18.integracao.bibliotecaestantemagica.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "Usuarios")
public class UsuariosEntity {
	
	
	@Id
	@GeneratedValue (strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nome", length = 150, nullable = false)
	private String nome;

	@Column (name = "cpf", length = 11, nullable = false)
	private int cpf;

	@Column (name = "email", length = 50, nullable = false)
	private String email;
	
	@Column (name = "telefone", length = 20, nullable = false)
	private int telefone;
	
	@Column (name = "endereco", length = 50, nullable = false)
	private String endereco;
	
	@Column (name = "dataNascimento", length = 15, nullable = false)
	private LocalDate dataNascimento;
	
	@Column (name = "tipo", length = 100, nullable = false)
	private String tipo;
	
	@Column (name = "senha", nullable = false)
	private String senha;
	
   
	
	
/// GETTERS E SETTERS 
///
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getTelefone() {
		return telefone;
	}

	public void setTelefone(int telefone) {
		this.telefone = telefone;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	}
	
