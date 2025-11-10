package br.edu.ifsp.partiu_vest.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String mensagem) {
        super(mensagem);
    }
}
