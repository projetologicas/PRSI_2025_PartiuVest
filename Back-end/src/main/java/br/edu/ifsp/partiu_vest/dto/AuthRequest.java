package br.edu.ifsp.partiu_vest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de requisição para login de usuário.")
public class AuthRequest {
    @NotBlank
    @Email
    @Size(max = 180)
    @Schema(description = "E-mail do usuário.", example = "aluno@partiuvest.com.br")
    private String email;

    @NotBlank
    @Schema(description = "Senha do usuário.", example = "SenhaSegura123")
    private String password;

    public AuthRequest(String email, String password) {
        setEmail(email);
        setPassword(password);
    }

    public AuthRequest() {
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