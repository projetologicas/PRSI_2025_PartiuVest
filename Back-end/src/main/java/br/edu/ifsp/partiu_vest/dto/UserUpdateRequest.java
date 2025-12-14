package br.edu.ifsp.partiu_vest.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de requisição para atualizar dados do perfil do usuário logado. Os campos são opcionais e só devem ser enviados se a alteração for desejada.")
public class UserUpdateRequest {
    @Schema(description = "Novo nome de exibição do usuário.", example = "Novo Nome", nullable = true)
    private String name;

    @Schema(description = "Novo e-mail do usuário (opcional).", example = "novo.email@partiuvest.com.br", nullable = true)
    private String email;

    @Schema(description = "Nova senha (opcional). Deve ser enviado junto com 'confirmPassword'.", example = "NovaSenha123", nullable = true)
    private String password;

    @Schema(description = "Confirmação da nova senha, se o campo 'password' foi preenchido.", example = "NovaSenha123", nullable = true)
    private String confirmPassword;

    public UserUpdateRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
}