package br.com.empresa18.integracao.bibliotecaestantemagica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.EmprestimoEntity;

@Repository
public interface EmprestismoRepository extends JpaRepository<EmprestimoEntity, Long> {

}
