package br.edu.ifsp.partiu_vest.config;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Partiu Vest API",
                version = "1.0.0",
                description = "Documentação completa dos endpoints do sistema Partiu Vest, incluindo gerenciamento de usuários, tentativas e questões.",
                contact = @Contact(name = "Seu Nome", email = "seu.email@exemplo.com")
        )
)
@SecurityScheme(
        name = "Bearer Token",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class OpenApiConfig {
}