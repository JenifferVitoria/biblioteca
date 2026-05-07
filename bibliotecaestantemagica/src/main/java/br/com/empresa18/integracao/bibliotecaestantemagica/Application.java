package br.com.empresa18.integracao.bibliotecaestantemagica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

/**
 *
 * Spring Boot application starter class
 */
@EntityScan("br.com.empresa18.integracao.bibliotecaestantemagica.entity")
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
