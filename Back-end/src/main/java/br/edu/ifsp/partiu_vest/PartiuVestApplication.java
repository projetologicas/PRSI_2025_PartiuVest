package br.edu.ifsp.partiu_vest;

import br.edu.ifsp.partiu_vest.service.JsonlProcessorService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PartiuVestApplication {

	public static void main(String[] args) {

        SpringApplication.run(PartiuVestApplication.class, args);
	}

    @Bean
    public CommandLineRunner runImport(JsonlProcessorService service){
        return args -> {
            System.out.println("Iniciando testes de importação");
            // mudar para 2022, 2023 e 2024 para subir os 3 anos separadamente no bd.
            String path = "provas/2024.jsonl";

            service.importQuestions(path);

            System.out.println("Importação concluida, desligando.");
        };
    }

}
