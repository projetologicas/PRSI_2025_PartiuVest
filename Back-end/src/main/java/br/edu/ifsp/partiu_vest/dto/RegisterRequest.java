package br.edu.ifsp.partiu_vest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de requisição para registrar um novo usuário.")
public class RegisterRequest {
    @NotBlank(message = "É necessário fornecer um nome")
    @Size(max = 120)
    @Schema(description = "Nome de exibição do novo usuário.", example = "Maria Silva")
    private String name;

    @NotBlank(message = "É necessário fornecer um email")
    @Email(message = "Formato de email inválido")
    @Size(max = 180)
    @Schema(description = "E-mail único para o login.", example = "novo.usuario@email.com")
    private String email;

    @NotBlank(message = "A senha não pode estar em branco")
    @Size(min = 6, max = 72, message = "A senha deve ter entre 6 e 72 caracteres")
    @Schema(description = "Senha do usuário (mínimo 6, máximo 72 caracteres).", example = "SenhaSegura456")
    private String password;

    public RegisterRequest(String name, String email, String password) {
        setName(name);
        setEmail(email);
        setPassword(password);
    }

    public RegisterRequest() {
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}