package br.edu.ifsp.partiu_vest.exceptions;

import org.springframework.http.HttpStatus;

import java.time.Instant;

public class RestError {
    private final Instant timestamp;
    private final int status;
    private final String error;
    private final String message;
    private final String path;
    private RestError(HttpStatus http, String message, String path) {
        this.timestamp = Instant.now();
        this.status = http.value();
        this.error = http.getReasonPhrase();
        this.message = message;
        this.path = path;
    }
    public static RestError of(HttpStatus http, String message, String path) {
        return new RestError(http, message, path);
    }
    // Getters
}

