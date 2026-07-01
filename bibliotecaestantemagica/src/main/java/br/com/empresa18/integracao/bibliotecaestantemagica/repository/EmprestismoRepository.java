package br.com.empresa18.integracao.bibliotecaestantemagica.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.empresa18.integracao.bibliotecaestantemagica.entity.EmprestimoEntity;

@Repository
public interface EmprestismoRepository extends JpaRepository<EmprestimoEntity, Long> {
	  
	List<EmprestimoEntity> findByUsuarioId(Long id);
	List<EmprestimoEntity> findByUsuarioRa(String ra);


}