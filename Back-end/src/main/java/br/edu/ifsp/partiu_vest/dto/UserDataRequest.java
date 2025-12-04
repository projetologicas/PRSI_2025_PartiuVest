package br.edu.ifsp.partiu_vest.dto;

public class UserDataRequest {
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
