package br.edu.ifsp.partiu_vest.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank
    @Size(max = 120)
    private String name;
    @NotBlank @Email
    @Size(max = 180)
    private String email;
    @NotBlank @Size(min = 6, max = 72)
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