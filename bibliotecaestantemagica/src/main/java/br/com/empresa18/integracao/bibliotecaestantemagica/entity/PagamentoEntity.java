package br.com.empresa18.integracao.bibliotecaestantemagica.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Pagamento")
public class PagamentoEntity implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private float valorPagamento;
	private LocalDate dataPagamento;
	private String formaPagamento;

    //RELACIONAMENTO COM DEVOLUCAO
	@OneToOne
	@JoinColumn(name = "idDevolucao")
	private DevolucaoEntity devolucao;

	public long getId() {
		return id;
	}

	public DevolucaoEntity getDevolucao() {
		return devolucao;
	}

	public void setDevolucao(DevolucaoEntity devolucao) {
		this.devolucao = devolucao;
	}

	public void setId(long id) {
		this.id = id;
	}

	public float getValorPagamento() {
		return valorPagamento;
	}

	public void setValorPagamento(float valorPagamento) {
		this.valorPagamento = valorPagamento;
	}

	public LocalDate getDataPagamento() {
		return dataPagamento;
	}

	public void setDataPagamento(LocalDate dataPagamento) {
		this.dataPagamento = dataPagamento;
	}

	public String getFormaPagamento() {
		return formaPagamento;
	}

	public void setFormaPagamento(String formaPagamento) {
		this.formaPagamento = formaPagamento;
	}



}
