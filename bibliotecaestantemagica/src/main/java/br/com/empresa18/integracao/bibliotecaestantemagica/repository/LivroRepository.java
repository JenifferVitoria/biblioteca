package br.com.empresa18.integracao.bibliotecaestantemagica.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.empresa18.integracao.bibliotecaestantemagica.entity.LivroEntity;

@Repository
public interface LivroRepository extends JpaRepository<LivroEntity, Long> {

	List<LivroEntity> findByGeneroContainingOrTituloContainingOrAutorContainingOrIsbnContaining(
	        String genero,
	        String titulo,
	        String autor,
	        String isbn);

	List<LivroEntity> findByTituloContainingIgnoreCase(String titulo);
	
}