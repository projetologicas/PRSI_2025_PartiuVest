package br.edu.ifsp.partiu_vest.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de requisição para buscar dados de um usuário específico, geralmente usado para rankings ou perfis públicos.")
public class UserDataRequest {
    @Schema(description = "ID do usuário a ser buscado.", example = "20", required = true)
    private Long id;


    public UserDataRequest(Long id) {
        this.id = id;
    }

    public UserDataRequest() {
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}