package br.edu.ifsp.partiu_vest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthRequest {
    @NotBlank
    @Email
    @Size(max = 180)
    private String email;
    @NotBlank
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
