package br.com.empresa18.integracao.bibliotecaestantemagica.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.ReservasEntity;

@Repository
public interface ReservasRepository extends JpaRepository<ReservasEntity, Long> {

}
