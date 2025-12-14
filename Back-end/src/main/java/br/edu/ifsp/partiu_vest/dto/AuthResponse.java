package br.edu.ifsp.partiu_vest.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Objeto de resposta contendo o token JWT após login bem-sucedido.")
public class AuthResponse {
    @Schema(description = "Token JWT de autenticação. Deve ser usado no header 'Authorization: Bearer <token>'.",
            example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
}