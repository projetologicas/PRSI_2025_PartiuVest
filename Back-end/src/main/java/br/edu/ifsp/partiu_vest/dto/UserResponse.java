package br.edu.ifsp.partiu_vest.dto;

import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.model.enums.Role;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de resposta básico do usuário, contendo apenas dados essenciais de identificação e permissão. Usado em login/cadastro e /auth/me.")
public class UserResponse {
    @Schema(description = "ID único do usuário.", example = "1")
    private Long id;

    @Schema(description = "Nome de exibição do usuário.", example = "Maria Silva")
    private String name;

    @Schema(description = "E-mail do usuário.", example = "aluno@partiuvest.com.br")
    private String email;

    @Schema(description = "Nível de permissão (ROLE) do usuário.", example = "USER")
    private Role role;

    public static UserResponse from(User user) {
        var response = new UserResponse();
        response.id = user.getId();
        response.name = user.getName();
        response.email = user.getEmail();
        response.role = user.getRole();
        return response;
    }

    public UserResponse(Long id, String name, String email, Role role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public UserResponse() {
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}