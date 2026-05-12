package br.com.empresa18.integracao.bibliotecaestantemagica.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.UsuariosEntity;

@Repository
public interface UsuariosRepository extends JpaRepository<UsuariosEntity, Long>{
	
	 Optional <UsuariosEntity> findByEmail(String email);
}
