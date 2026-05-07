package br.com.empresa18.integracao.bibliotecamagica.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.empresa18.integracao.bibliotecamagica.entity.UsuariosEntity;

public interface UsuariosRepository extends JpaRepository<UsuariosEntity, Long>{

}
