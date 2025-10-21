package br.edu.ifsp.partiu_vest.controller;

import br.edu.ifsp.partiu_vest.dto.AuthRequest;
import br.edu.ifsp.partiu_vest.dto.RegisterRequest;
import br.edu.ifsp.partiu_vest.dto.UserResponse;
import br.edu.ifsp.partiu_vest.model.User;
import br.edu.ifsp.partiu_vest.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest dto) {
        UserResponse response = userService.register(dto);
        if (response == null) {
            return ResponseEntity.status(HttpStatusCode.valueOf(403)).build();
        }
        return ResponseEntity.ok(response);
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@Valid @RequestBody AuthRequest dto) {
        UserResponse response = userService.checkCredentials(dto);
        if (response == null) {
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).build();
        }
        return ResponseEntity.ok(response);
    }
}
